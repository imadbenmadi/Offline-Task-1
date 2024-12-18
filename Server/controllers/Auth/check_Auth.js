const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../../Models/Users");
const Refresh_tokens = require("../../Models/RefreshTokens");

router.get("/", async (req, res) => {
    const { Users_ACCESS_TOKEN_SECRET, Users_REFRESH_TOKEN_SECRET } =
        process.env;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || !refreshToken) {
        if (accessToken)
            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
        if (refreshToken)
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });

        return res.sendStatus(401);
    }
    const verifyToken = (token, secret) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    };

    const handleTokenExpired = async (
        refreshToken,
        refreshTokenSecret,
        accessTokenSecret
    ) => {
        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const found_in_DB = await Refresh_tokens.findOne({
            where: { token: refreshToken },
        });
        if (!found_in_DB) {
            return res.sendStatus(401);
        }

        return new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken,
                refreshTokenSecret,
                async (err, decoded) => {
                    if (err) {
                        return res.sendStatus(401);
                    }

                    const newAccessToken = jwt.sign(
                        { userId: decoded.userId },
                        accessTokenSecret,
                        { expiresIn: "1h" }
                    );

                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        sameSite: "None",
                        secure: true,
                        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
                    });

                    let user = await Users.findOne({
                        where: { id: decoded.userId },
                    });

                    if (!user) {
                        return res.sendStatus(404);
                    }
                    resolve({ userId: user.id });
                }
            );
        });
    };

    try {
        let decoded;

        let user = null;

        try {
            decoded = await verifyToken(accessToken, Users_ACCESS_TOKEN_SECRET);
            user = await Users.findOne({ where: { id: decoded.userId } });
        } catch (err) {
            if (err.name === "TokenExpiredError" || !accessToken) {
                try {
                    const result = await handleTokenExpired(
                        refreshToken,
                        Users_REFRESH_TOKEN_SECRET,
                        Users_ACCESS_TOKEN_SECRET
                    );
                    return res.sendStatus(200);
                } catch (err) {
                    console.log("Error refreshing Users token:", err);
                }
            }
        }

        if (!user) {
            return res.sendStatus(401);
        }

        return res.status(200).json({
            message: "check auth: true, Access token is valid",
            userId: user.id,
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
