const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db.config");
const Category = require('./productCategory');
const Cart = require('./cart');

const Product = Sequelize.define('Product', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,

    },
    price:{
        type: DataTypes.STRING,

    },
    discounted_price:{
        type: DataTypes.STRING,
    },
    attachement:{
        type: DataTypes.STRING,
    },
    qunatity_Available: {
        type: DataTypes.STRING,
    },
    product_available: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.STRING,
    },
    color: {
        type: DataTypes.STRING,  
    }

});

////////////////////////////////////////////// Relation  //////////////////////////////////////////////////////


// product  ---> Category  relation
Category.hasMany(Product, {
    as: 'products',
})

Product.belongsTo(Category,{
    as: 'categories',
})



module.exports = Product;