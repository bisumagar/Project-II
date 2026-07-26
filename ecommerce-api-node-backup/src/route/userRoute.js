const express = require("express");
const router = express.Router();

const userController = require("../controller/userController.js");
const { authenticate } = require("../middleware/authenticate.js");

router.get("/profile", authenticate, userController.getUserProfile);
router.get("/", userController.getAllUsers);

module.exports = router;