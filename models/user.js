   const {Sequelize,  DataTypes} = require('sequelize')

 const sequelize = require('../config/db.config');
const Shop = require('./shop');


const Cart = require('./cart');
const Product = require('./product');



//  create user schema
const User = sequelize.define( 'User', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull:false,
    autoIncrement: true,
},
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
   validate:{
     isEmail: true  
   }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_type: {
    type: DataTypes.ENUM,
    values:['Shopkeeper' ,'Admin', 'Rider', 'Customer' ], 
allowNull: false


  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  addressTitle:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null

  },

  zipCode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null

  },

  
  state: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null

  },

isApprove: {
  type: DataTypes.BOOLEAN,
  allowNull: true,
  defaultValue: true
},
vehicle_detail: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: null

},
workingArea:{
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: null

},

isAvailable: {
  type: DataTypes.BOOLEAN,
  allowNull: true,
  defaultValue: false

},
long: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: null

},
});


// USER SHOP RELATION SHOP
 User.hasMany( Shop, {  as: 'shops' });
 Shop.belongsTo( User, {
   foreignKey: 'UserId',
   as: 'Blog'
 } )

 User.hasMany(Cart)

 Cart.belongsTo(User)
Product.hasMany(Cart);
Cart.belongsTo(Product);


module.exports = User;
