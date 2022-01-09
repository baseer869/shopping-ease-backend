const express = require("express");
const router = express.Router();
const api = process.env.Api_Url;

const city = require("../controllers/cityController");

router.post(`${api}/addCity`, city.addCity);
module.exports = router;