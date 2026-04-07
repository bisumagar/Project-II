const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../service/userService.js");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Token not found" });
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userService.findUserById(userId);
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).send({ error: "Invalid or expired token" });
        }
        return res.status(500).send({ error: error.message });
    }
};

 module.exports={authenticate};