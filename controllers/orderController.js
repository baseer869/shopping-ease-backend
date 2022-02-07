const sequelize = require("../config/db.config");
const Product = require("../models/product");
const Shop = require("../models/shop");
var customId = require("custom-id");

require("dotenv/config");

const Cart = require("../models/cart");
const Order = require("../models/order");

const { Op } = require("sequelize");
const User = require("../models/user");

// DELETE PRODUCT BY ID
module.exports.placeOrder = async (req, res) => {
  sequelize.sync().then(async () => {
    try {
      let orderNumber = (await "SE") + customId({ user_id: req.body.user_id });
      var body = req.body;
      Object.assign(body, { orderNumber: orderNumber });
      if (orderNumber) {
        let order = await Order.create(req.body);
        if (order) {
          return res.status(200).send({
            status: 200,
            message: `Order created successfully`,
            order,
          });
        } else {
          return res.status(400).send({
            status: 400,
            message: `DB Error while creating order`,
            order: null,
          });
        }
      }
    } catch (error) {
      return res.status(400).send({
        code: 400,
        error: false,
        message: "Server Error",
      });
    }
  });
};

//LIST ORDER
module.exports.listOrder = async (req, res) => {
  sequelize.sync().then(async () => {
    try {
      let findQuery = {
        where: [],
        include:[],
      };
       if( req.body.shop_id && req.body.shop_id !== null){
        findQuery.where.push({ shop_id: req.body.shop_id });
      let shop = await Cart.findOne(findQuery);
      if (shop) {
        findQuery.where= [];
        
        findQuery.where.push({ user_id: shop.dataValues.UserId });

         let isOrder = await Order.findAll(findQuery);

         if(!isOrder){
             return res.status(200).send({
                status: 200,
                message: `Currently you have no order`,
                isOrder,
              }); 
         } else if(isOrder){ 
             findQuery.where=[];       

             findQuery.where.push({ shop_id: shop.dataValues.shop_id,  })
             findQuery.include.push({
                 model:User,
                }); 
                                                                                                                               
             let userDetail = await Cart.findOne(findQuery);
            
             if(userDetail){
                let product = await Cart.findAll({
                    where:{UserId: userDetail.UserId  },
                    include:{
                        model: Product,
                    }
                });
                 return res.status(200).json({
                     status: 200,
                     message:"Fetch Succesfully",
                     order:{
                        orderDetail: isOrder,
                        userDetail: userDetail.User,
                        CartDetail: product
                     }
                                       
                 });
             }
         }
        return res.status(200).send({
          status: 200,
          message: `Fetch successfully`,
          shop,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: `DB Error`,
          shop: null,
        });
      }
    } else {
        return res.status(400).send({
            status: 400,
            message: `Field is required`
          }); 
    }
    } catch (error) {
      return res.status(400).send({
        code: 400,
        error: false,
        message: "Server Error",
      });
    }
  });
};


// DELETE PRODUCT BY ID
module.exports.getOrder = async (req, res) => {
    sequelize.sync().then(async () => {
      try {
           let findQuery ={
               where:{ user_id: req.body.user_id,   },
               include:{
                   model: User,
                   as:'users',
                   attributes:['id', 'username']
               },
           }
            let order =  await Order.findOne(findQuery);

            if(!order){
                return res.status(200).send({
                    status: 200,
                    message: `Currently you have not order`,
                    data: null,
                  });
            } else if(order){
            return res.status(200).send({
              status: 200,
              message: `Fetch Sucessfully`,
              data: order,
            });
        }
         
      } catch (error) {
        return res.status(400).send({
          code: 400,
          error: false,
          message: "Server Error",
        });
      }
    });
  };