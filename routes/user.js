const express = require("express");
const router = express.Router();
require("dotenv/config");

const api = process.env.Api_Url;

////////////////////////////// CONTROLLER IMPORT //////////////////////////////////////////////////
const user = require('../controllers/userController');




//////////////////////////// ROUTES //////////////////////////////////////////////////////////////
router.post(`${api}/register`, user.register );
router.post(`${api}/login`, user.login);
router.get(`${api}/list`, user.listOfRegisteredUser);


module.exports = router;
