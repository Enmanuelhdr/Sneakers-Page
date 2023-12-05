const express = require("express");
const router = express.Router();

const rutaLoginValidacion = require("../middleware/validacionRutaLogin")
const authController = require("../controllers/authController");
const carritoController = require("../controllers/carritoController");

router.get("/Sign-Up",authController.GetSignUp);
router.post("/signUp",authController.PostSignUp);
router.get("/Login",authController.GetLogin);
router.post("/adentro",authController.PostLogin);
router.get("/carrito", rutaLoginValidacion, carritoController.GetCarrito);
router.get("/",authController.GetSite);

//hola


module.exports = router;