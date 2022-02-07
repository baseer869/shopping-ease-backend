const express = require("express");
const order = require("../controllers/orderController");
const router = express.Router();
require("dotenv/config");

const api = process.env.Api_Url;

////////////////////////////// CONTROLLER IMPORT //////////////////////////////////////////////////
const user = require('../controllers/userController');




//////////////////////////// ROUTES //////////////////////////////////////////////////////////////
router.post(`${api}/register`, user.register );
router.post(`${api}/login`, user.login);
router.get(`${api}/list`, user.listOfRegisteredUser);
router.get(`${api}/userInfo`, user.userInfo);
router.post(`${api}/updateUser`, user.updateUser);


// order 
router.post(`${api}/placeOrder`, order.placeOrder);
router.get(`${api}/listOrder`, order.listOrder);
router.post(`${api}/getOrder`, order.getOrder);






module.exports = router;
