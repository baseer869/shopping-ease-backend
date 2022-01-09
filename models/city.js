// const { DataTypes, ENUM } = require("sequelize");
// const Sequelize = require("../config/db.config");
// const Markets = require("./market");

// const City = Sequelize.define("City", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   city: {
//     type: ENUM("islamabad", "rawalpindi"),
//   },
// });

// //association
// City.hasMany(Markets, {
//   as: "markets",
// });
// Markets.belongsTo(City, {
//   as: "cities",
// });

// module.exports = City;
