const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/Sign-Up",authController.GetSignUp);

module.exports = router;