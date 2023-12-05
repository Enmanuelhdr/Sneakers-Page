const express = require("express");
const router = express.Router();

const siteController = require("../controllers/siteController");

router.get("/AboutUs",siteController.GetAboutUs);

router.get("/Seneaker",siteController.GetSneakers);

module.exports = router;