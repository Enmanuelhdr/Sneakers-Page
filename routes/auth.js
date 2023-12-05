const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const isAuth = require("../middleware/isAuth");

router.get("/login",isAuth.Auth,authController.GetLogin);
router.post("/login",isAuth.Auth,authController.PostLogin);
router.post("/logout",authController.PostLogout);
router.get("/signup",authController.GetSignUp);
router.post("/signup",authController.PostSignUp);


module.exports = router;