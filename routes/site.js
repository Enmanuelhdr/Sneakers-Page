const express = require("express");
const router = express.Router();

const siteController = require("../controllers/siteController");

router.get("/AboutUs",siteController.GetAboutUs);

router.get("/Sneaker",siteController.GetSneakers);
router.get("/Sneaker-info",siteController.GetSneakersInfo);
router.get("/SneakerCrud",siteController.GetCrudSneakers);

module.exports = router;