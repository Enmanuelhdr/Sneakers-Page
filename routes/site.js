const express = require("express");
const router = express.Router();

const siteController = require("../controllers/siteController");

router.get("/AboutUs",siteController.GetAboutUs);

module.exports = router;