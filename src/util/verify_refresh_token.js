import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

const verifyRefreshToken=async (refreshToken) => {

    return new Promise((resolve, reject) => {

        if (!refreshToken) return reject({ message: "Invalid refresh token" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject({ message: "Invalid refresh token" });

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, tokenDetails) => {
                if (err) {
                    return reject({ error: true, message: "Invalid refresh token" });
                }
                resolve({
                    tokenDetails,
                    message: "Valid refresh token",
                });
            });
        });
    });
};

export default verifyRefreshToken;