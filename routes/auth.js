const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/Sign-Up",authController.GetSignUp);
router.post("/signUp",authController.PostSignUp);
router.get("/Login",authController.GetLogin);
router.post("/adentro",authController.PostLogin);
router.get("/",authController.GetSite);


module.exports = router;