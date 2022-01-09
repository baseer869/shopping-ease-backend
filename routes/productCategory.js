const express = require("express");
const router = express.Router();
require("dotenv/config");

const api = process.env.Api_Url;


////////////////////////////// CONTROLLER IMPORT //////////////////////////////////////////////////
const category = require('../controllers/categoryController');




//////////////////////////// ROUTES //////////////////////////////////////////////////////////////
router.post(`${api}/category`,   category.addCategory );
router.get(`${api}/category`,   category.ListCategory );


module.exports = router;
