const express = require("express");
const router = express.Router();
require("dotenv/config");

const api = process.env.Api_Url;


////////////////////////////// CONTROLLER IMPORT //////////////////////////////////////////////////
const shop = require('../controllers/shopController');




//////////////////////////// ROUTES //////////////////////////////////////////////////////////////
router.post(`${api}/shop`, shop.addShop );
router.get(`${api}/shop`, shop.ListShop );
router.post(`${api}/pending-shop`, shop.ListPendingShop );
router.post(`${api}/update-shop`, shop.updateStatus );
router.post(`${api}/get-status`, shop.checkShopStatus );





























// get user shop detail by user_id 

// router.post(`${api}/get-current-shop`, async (req, res) =>{
//  const  shop = await Shop.find({ seller_id: req.body.seller_id })
//  if(shop){
//    return res.status(200).send({
//      message: 200,
//      message:'Shop found',
//      shop : shop
//    })
//  } else{
//    return res.status(400).send({
//      code: 400,
//      message:'shop not found',
//    })
//  }


// })

// router.get(`${api}/list-shop`, async (req, res) =>{
//   const  shop = await Shop.find({ })
//   if(shop){
//     return res.status(200).send({
//       message: 200,
//       message:'Shop found',
//       shop : shop
//     })
//   } else{
//     return res.status(400).send({
//       code: 400,
//       message:'shop not found',
//     })
//   }
 
 
//  })
module.exports = router;
