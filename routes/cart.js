const express = require("express");
const router = express.Router();
const api = process.env.Api_Url;
const cart = require('../controllers/cart');

router.post(`${api}/addToCart`, cart.addToCart);
router.get(`${api}/listCart`, cart.ListCart);

module.exports = router;
