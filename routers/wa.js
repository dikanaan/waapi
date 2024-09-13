const express = require("express");
const api = require("../controllers/waControllers.js")

const router = express.Router();


router.get("/api", api)
router.post("/send", api)


module.exports = router;