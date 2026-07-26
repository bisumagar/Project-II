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
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).send({ error: "Invalid or expired token" });
        }
        return res.status(500).send({ error: error.message });
    }
};

const requireAdmin = (req, res, next) => {
    const role = String(req.user?.role || "")
        .trim()
        .toUpperCase();
    if (role !== "ADMIN" && role !== "ROLE_ADMIN") {
        return res.status(403).send({ error: "Admin access required" });
    }
    return next();
};

module.exports = { authenticate, requireAdmin };