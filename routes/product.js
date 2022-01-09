const express = require("express");
const router = express.Router();
require("dotenv/config");

const api = process.env.Api_Url;


////////////////////////////// CONTROLLER IMPORT //////////////////////////////////////////////////
const product = require('../controllers/productController');




//////////////////////////// ROUTES //////////////////////////////////////////////////////////////
router.post(`${api}/product`,   product.addProduct );   

router.get(`${api}/listProduct`,   product.ListProduct );                             
router.delete(`${api}/product`,   product.deleteProduct );                                  
router.put(`${api}/product`, product.upload.single('attachement'),  product.updateProduct ); 
router.put(`${api}/change-product-status`, product.changeProductStatus );                                       

// product.upload.single('attachement'),










module.exports = router;

