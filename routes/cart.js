const express = require("express");
const router = express.Router();
const api = process.env.Api_Url;
const cart = require('../controllers/cart');

router.post(`${api}/addToCart`, cart.addToCart);
router.get(`${api}/listCart`, cart.ListCart);
router.post(`${api}/removeFromCart`, cart.removeFromCart);
router.post(`${api}/clearCartOnMarketChange`, cart.clearCartOnMarketChange);
router.get(`${api}/checkCart`, cart.checkCart);
router.post(`${api}/updateStatus`, cart.updateStatus);




module.exports = router;