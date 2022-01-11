const { Sequelize } = require("sequelize");
const sequelize = require("../config/db.config");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Shop = require("../models/shop");


require("dotenv/config");

module.exports.addToCart = async (req, res, next) => {
  try {
    sequelize.sync().then(async () => {
      let quantity = 1;
      let findQuery = {
        where: { ProductId: req.query.id, UserId: req.query.userId },
      };

      let product = await Cart.findOne(findQuery);

      if (product) {
        if (parseInt(req.body.quantity) === 0) {  // also check for null
          let remove = await Cart.destroy(findQuery, product);
          if (remove) {
            return res.status(200).send({
              status: 200,
              message: "Successfuly remove",
              data: [],
            });
          } else {
            return res.status(400).send({
              status: 400,
              message: "Error while deleting item",
              data: [],
            });
          }
        } else {
             const oldQty = product.dataValues.quantity;
             const totalPrice = product.dataValues.totalPrice + req.body.price;
             quantity = oldQty + 1;
            let body = {
              quantity,
              totalPrice: totalPrice,
              ProductId:  req.body.ProductId,
              UserId: req.body.UserId
            } 
            console.log('update body-->', body)
          let updateCart = await Cart.update(body, findQuery);
          if (updateCart) {
            return res.status(200).send({
              status: 200,
              message: "Cart update",
              data: {
                result: product,
              },
            });
          } else {
            return res.status(400).send({
              status: 400,
              message: "Error while updating",
              data: [],
            });
          }
        }
       
      } else {
         let body ={  
         quantity,
         totalPrice: req.body.price,
         ProductId: req.body.ProductId,
         UserId: req.body.UserId
         }
        let cart = await Cart.create(body);
        if (!cart) {
          return res.status(400).send({
            status: 400,
            message: "Faild to add ",
          });
        }
        return res.status(200).send({
          status: 200,
          message: "successfull added ",
        });
      }
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Server Error",
    });
  }
};

module.exports.ListCart = async (req, res, next) => {
  try {
    let findQuery = {
      where: { UserId: req.query.id },
     
      include:{
        model: Product
      },
    };
    let list = await Cart.findAll(findQuery);
    let cartTotal = await  Cart.findOne({
      where:{ UserId : req.query.id },
      attributes:[
        [ Sequelize.literal('(select SUM(`totalPrice`) FROM shoppingease.carts  WHERE `UserId`=1)'), 'cartTotal']
      ],
    });
    if (list && cartTotal) {
      return res.status(200).send({
        status: 200,
        message: "Fetch Succesfuuly",
        data: {
          result: list,
          cartTotal
        },
      });
    } else {
      return res.status(400).send({
        status: 400,
        message: "Not Found",
        data: [],
      });
    }
  } catch (error) {
    return res.status(404).send({
      status: 404,
      message: "Server error",
    });
  }
};


// first time object chlu jaye ga 
// agr 