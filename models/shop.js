const sequelize = require("../config/db.config");
const { DataTypes, Sequelize } = require("sequelize");
// const Category = require("./productCategory");
const Product = require("./product");
const ShopCategory = require("./storeCategory");
const Markets = require("./market");
const Category = require("./productCategory");
const Cart = require("./cart");



const Shop = sequelize.define('Shop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  shop_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  shop_category: {
    type: DataTypes.STRING,

  },
  shop_image: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  shop_city: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  long: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  market_name: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  isOpen: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: true
  },
  totalEarned: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null

  },
  verified:{
    type :  DataTypes.STRING ,
    enum :['pending', 'accepted', 'rejected'],
    default :'pending'
  },
});

///////////////////////////////////////////// RELATION /////////////////////////////////////
Markets.hasMany(Shop);
Shop.belongsTo(Markets);

Shop.hasMany(Product, {
  as: 'Product',
})

Product.belongsTo(Shop,{
    as: 'Shop',
});


ShopCategory.hasMany(Shop);
Shop.belongsTo(ShopCategory);

//shop and category relation
Shop.hasMany(Category);
Category.belongsTo(Shop);

// User.hasMany(Cart, {
//   as:'carts',
//   foreignKey: "shop_id",
// });
// Cart.belongsTo(User,{
//     as:'users',
//     foreignKey: "shop_id",
//   }
// );


module.exports = Shop;
