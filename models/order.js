const sequelize = require("../config/db.config");
const { DataTypes, Sequelize } = require("sequelize");
const User = require("../models/user");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  },
  order_status: {
    type: DataTypes.STRING,
    enum: ["accepted", "pending", "rejected"],
    defaultValue: "pending",
  },
});

// ----------------------------------- Relation ----------------------//

User.hasMany(Order, {
  as: "orders",
  foreignKey: "user_id",
});
Order.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
});

module.exports = Order;
