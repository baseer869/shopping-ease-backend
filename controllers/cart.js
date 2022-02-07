const { Sequelize , Op} = require("sequelize");
const sequelize = require("../config/db.config");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Shop = require("../models/shop");


require("dotenv/config");

module.exports.addToCart = async (req, res, next) => {
  try {
    sequelize.sync().then(async () => {
     
      let cartTotal = await  Cart.findOne({
        where:{ UserId : req.body.UserId },
        attributes:[
          [ Sequelize.literal('(select SUM(`totalPrice`) FROM shoppingease.carts  WHERE `UserId`=1)'), 'cartTotal']
        ],
      });

       if( cartTotal || cartTotal == null){
        let cartTotalPrice = parseInt(cartTotal?.dataValues?.cartTotal); 
       
        if(cartTotalPrice  == 10000){
          return res.status(400).send({
            status: 400,
            message:"Shopping  Cart Limit Exceeded",
            data:{
              result: cartTotalPrice
            }
          });
  
       }
      let quantity = 1;
      let findQuery = {
        where: { ProductId:  req.body.ProductId, UserId: req.body.UserId },
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
         UserId: req.body.UserId,
         shop_id: req.body.shop_id
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
    }
  } 
  );
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
      where: {
        [Op.and]: [
          { UserId: req.query.id, },
          { is_placed: 0 }
        ]
      },
      include:{
        model: Product
      },
    };
    let list = await Cart.findAll(findQuery);
    let cartTotal = await  Cart.findOne({
      where: {
        [Op.and]: [
          { UserId: req.query.id, },
          { is_placed: 0 }
        ]
      },
      attributes:[
        [ Sequelize.literal('(select SUM(`totalPrice`) FROM shoppingease.carts)'), 'cartTotal']
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


module.exports.clearCart = async (req, res, next) => {
  try {
    let findQuery = {
      where: { UserId: req.query.id }
    };
    let list = await Cart.destroy(findQuery);
    
    if (list) {
      return res.status(200).send({
        status: 200,
        message: "Delete Succesfuuly",
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

//remove from cart
module.exports.removeFromCart = async (req, res, next) => {
  try {
    sequelize.sync().then(async () => {
      let quantity ;
      let findQuery = {
        where: { ProductId: req.body.ProductId, UserId:  req.body.UserId },
      };

      let product = await Cart.findOne(findQuery);

      if (product) {
        if (parseInt(req.body.quantity) === 1  ) { 
          console.log('cart item 1-->', parseInt(req.body.quantity) )
          // also check' for null
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
             const totalPrice = product.dataValues.totalPrice - req.body.price;
             quantity = oldQty - 1;

            let body = {
              quantity,
              totalPrice: totalPrice,
              ProductId:  req.body.ProductId,
              UserId: req.body.UserId
            } 
            console.log(' prev prodduct in cart-->', body);
          let updateCart = await Cart.update(body, findQuery);
          if (updateCart) {
            return res.status(200).json({
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
       
      } 
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Server Error",
    });
  }
};



//remove from cart
module.exports.clearCartOnMarketChange = async (req, res, next) => {
  try {
    sequelize.sync().then(async () => {
      let findQuery = {
        where: { UserId:  req.query.UserId },
      };

      let cart = await Cart.destroy(findQuery);
      if(cart){
        return res.status(200).send({
          status: 200,
          message: "Cart Clear succesfully",
          data:cart
        });
      } else {
        return res.status(200).send({
          status: 200,
          message: "DB Error while clear cart",
          data:[]
        });
      }
 
    })     
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Server Error",
    });
  }
};

//remove from cart
module.exports.checkCart = async (req, res, next) => {
  try {
    sequelize.sync().then(async () => {
      let findQuery = {
        where: { UserId:  req.query.UserId },
      };

      let cart = await Cart.findAll(findQuery);
      if(cart){
        return res.status(200).send({
          status: 200,
          message: "Fetch succesfully",
          data:cart
        });
      } else {
        return res.status(200).send({
          status: 200,
          message: "Data not found",
          data:[]
        });
      }
 
    })     
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Server Error",
    });
  }
};

////

module.exports.updateStatus = async (req, res, next) => {
  try {
    sequelize.sync().then(async () => {
      let findQuery = {
        where: { UserId:  req.query.id },
      };

      let cart = await Cart.findAll(findQuery);

      if(cart){
        let isUpdated = await Cart.update({ is_placed:1   }, findQuery);
        if(isUpdated){
          return res.status(200).send({
            status: 200,
            message: "updated",
            
          });
        } else {
          return res.status(200).send({
            status: 200,
            message: "DB error While updating",
            data:null
          });
        }
        
      } else {
        return res.status(200).send({
          status: 200,
          message: "Data not found",
          data:[]
        });
      }
 
    })     
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Server Error",
    });
  }
};

