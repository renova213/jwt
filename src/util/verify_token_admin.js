import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import authModel from '../model/auth.js';
import userToken from '../model/user_token.js';

dotenv.config();

const auth=async (req, res, next) => {
    const authheader=req.header('authorization');
    const token=authheader&&authheader.split(' ')[1];

    if (!token)
        return res
            .status(401)
            .json({ message: "Access Denied: No token provided" });

    try {
        const authId=await userToken.findOne({ "accessToken": token }).catch(err => console.log(err));
        const role=await authModel.findOne({ "_id": authId.authId }).catch(err => console.log(err));
        if (role.role!=="admin") return res.status(403).json({ "message": "Access Denied: Forbidden for this user" });

        const tokenDetails=jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user=tokenDetails;
        next();
    } catch (err) {
        res
            .status(401)
            .json({ message: err['message'] });
    }
};

export default auth;