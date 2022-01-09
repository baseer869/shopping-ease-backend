const express = require("express");
const router = express.Router();
const api = process.env.Api_Url;

const markets = require("../controllers/marketController");

router.post(`${api}/addMarket`, markets.addMarket);
router.get(`${api}/listMarket`, markets.listMarket);

module.exports = router;