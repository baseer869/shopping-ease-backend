const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Shop = require("./shop");



const ShopCategory = sequelize.define('shopCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

///////////////////////////////////////////// RELATION /////////////////////////////////////




module.exports = ShopCategory;
