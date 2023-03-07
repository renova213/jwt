import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

const auth=async (req, res, next) => {
    const authheader=req.header('authorization');
    const token=authheader&&authheader.split(' ')[1];

    if (!token)
        return res
            .status(401)
            .json({ message: "Access Denied: No token provided" });

    try {
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