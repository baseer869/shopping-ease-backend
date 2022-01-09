const { DataTypes,ENUM } = require("sequelize");
const Sequelize = require("../config/db.config");

const Markets =  Sequelize.define("market", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  city: {
    type: ENUM("islamabad", "rawalpindi"),
    // values:[]
  },
  latitude: {
    type: DataTypes.INTEGER,
  },
  longitude: {
    type: DataTypes.INTEGER,
  },
  visiter: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Markets;
