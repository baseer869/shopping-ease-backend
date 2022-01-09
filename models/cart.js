const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db.config");



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
    

});



module.exports = Cart;