import jwt from "jsonwebtoken";
import UserToken from "../model/user_token.js";
import * as dotenv from 'dotenv';

dotenv.config();

const generateTokens=async (auth) => {
    try {
        const payload={ id: auth.id };
        const accessToken=jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "14m" }
        );
        const refreshToken=jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "30d" }
        );

        const userToken=await UserToken.findOne({ authId: auth.id });
        if (userToken) await UserToken.findByIdAndRemove(userToken.id);

        await new UserToken({ authId: auth.id, refreshToken: refreshToken, accessToken: accessToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

export default generateTokens;