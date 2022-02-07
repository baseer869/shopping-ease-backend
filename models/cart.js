const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db.config");
const Product = require("../models/product");



const Cart = Sequelize.define('cart', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true,
    },
    quantity:{
        type: DataTypes.INTEGER,
    },
    totalPrice:{
        type: DataTypes.INTEGER,
    },
    shop_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Shop",
          key: "id"
        }
      },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id"
        }
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Product",
          key: "id"
        }
      },
      is_placed:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      }

});



module.exports = Cart;