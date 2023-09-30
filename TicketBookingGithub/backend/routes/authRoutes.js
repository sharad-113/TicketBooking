const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController");

// registration route
router.route("/registration").post(registerUser);

// login route
router.route("/login").post(loginUser);

module.exports = router;
