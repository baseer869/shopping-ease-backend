const express = require("express");
const app = express();
const authJwt = require('./helper/AuthJwt');
const test = require('@google/earthengine');
var cors = require('cors')
//  dotenv read env variable
require("dotenv/config");

// app.use(cors({
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//   origin: 'http://localhost:19006'
// }))
// router 
const user = require('./routes/user');
const store = require('./routes/store');
const market = require('./routes/market');
const shop = require('./routes/shop');
const storeCategory = require('./routes/storeCategory');
const productCategory = require('./routes/productCategory');
const product = require('./routes/product');
const cart = require('./routes/cart');
// const city = require('./routes/city');


// json parse across network request
app.use(express.json());

// load middleware
app.use(user);
app.use(market);
app.use(shop);
app.use(product);
app.use(productCategory);
app.use(storeCategory);
// app.use(city)
app.use(cart)


app.get('/dd', (req, res)=>{
  res.send('resssss')
})
// app.use(authJwt())


// port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

require('./config/db.config');
console.log('app.js')