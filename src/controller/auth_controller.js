import auth from '../model/auth.js';
import user from '../model/user.js';
import UserToken from '../model/user_token.js';
import bcrypt from 'bcryptjs';
import validation from '../util/validation.js';
import * as dotenv from 'dotenv';
import generateTokens from "../util/generate_tokens.js";
import verifyRefreshToken from "../util/verify_refresh_token.js";
import jwt from "jsonwebtoken";

dotenv.config();

const register=async (req, res) => {
    try {
        const role=req.body.role;
        const password=req.body.password;
        const confirmationPassword=req.body.confirmationPassword;

        const { error }=validation.registerValidation(req.body);

        if (role!=="user"&&role!=="admin") return res.status(400).json({ message: "Role tidak sesuai" });
        if (error) return res.status(400).json({ message: error.details[0].message });
        if (password!==confirmationPassword) return res.status(400).json({ message: "Password tidak sama" });

        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(req.body.password, salt);
        const nameExist=await auth.findOne({ "username": req.body.username });
        const body=new auth({
            username: req.body.username,
            password: hash,
            role: role
        })

        if (nameExist) {
            return res.status(400).json({ "message": "Username sudah digunakan" });
        }

        user.create({ username: req.body.username });

        delete req.body.confirmationPassword;
        auth.create(body).then(() =>
            res.json({ message: "Berhasil register", data: body }));

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const login=async (req, res) => {
    try {

        //if username exist
        const validUsername=await auth.findOne({ username: req.body.username });

        if (!validUsername) {
            return res.status(401).json({ "message": "Username salah" });
        }

        // //if password valid
        const validPassword=await bcrypt.compare(req.body.password, validUsername.password);
        if (!validPassword) {
            return res.status(401).json({ "message": "Password salah" });
        }

        //token
        const { accessToken, refreshToken }=await generateTokens(validUsername);
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: "Logged in sucessfully",
        });

    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const refreshAccessToken=async (req, res) => {
    const refreshToken=req.body.refreshToken;
    if (!refreshToken) return res.status(400).json({ message: "Required access token" });

    const userToken=await UserToken.findOne({ "refreshToken": refreshToken });
    const { tokenDetails }=await verifyRefreshToken(userToken?.refreshToken??"").catch((err) => res.status(401).json(err));

    console.log(tokenDetails);
    const payload={ id: tokenDetails.id };
    const accessToken=jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "14m" }
    );

    res.status(200).json({
        accessToken: accessToken,
        message: "Access token created successfully",
    });
}

export default { register, login, refreshAccessToken }