const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db.config");

const Category = Sequelize.define('Category',{
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
  attachement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

///////////////////////////////////// Relation /////////////////////////////////////////////






module.exports = Category;
