const express = require("express");
const router = express.Router();

const siteController = require("../controllers/siteController");
const isAuth = require("../middleware/isAuth");


router.get("/",siteController.GetSite);
router.get("/AboutUs",siteController.GetAboutUs);
router.get("/Sneaker",siteController.GetSneakers);
router.get("/Sneaker-info/:sneakerId",siteController.GetSneakersInfo);
router.get("/SneakerCrud",siteController.GetCrudSneakers);
router.post("/add-sneaker",siteController.PostAddSneaker);
router.get("/search",siteController.GetSearch); 
router.get("/tetsuo",siteController.pruebaTetsuo); 
router.get("/ConsultasPreguntas",siteController.GetConsultasPreguntas); 

module.exports = router;