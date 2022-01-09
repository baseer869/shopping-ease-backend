const express = require("express");
const router = express.Router();
const api = process.env.Api_Url;

// model
const City = require("../models/city");
const StoreCategies = require("../models/storeCategory");



// add market to existing city
router.post(`${api}/add-market`, async (req, res) => {
  const createdMarket = await City.findOneAndUpdate(
    {
      name: req.body.name, //check for city, if exist then add market
    },
    {
      $addToSet: {
        markets: req.body.market,
      },
    }
  );
  if (createdMarket) {
    return res.send({
      message: "Success",
      code: 200,
    });
  } else {
    return res.send({
      message: "city not found",
      code: 409,
    });
  }
});

// create storeCategory

router.post(`${api}/store-category`, async (req, res) => {
  // create StoreCategies instance
  const Category = new StoreCategies({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  // save to db
  const created = await Category.save();
  if (!created) {
    return res.status(201).send({
      message: "Server error",
      code: 201,
    });
  } else {
    return res.status(200).send({
      message: "successfully created!",
      code: 200,
    });
  }
});
//  todo:
// create store
// bata
router.post(`${api}/create-store`, async (req, res) => {
  const created = await Store.findOne({ name: req.body.name });
  if (created) {
    return res.status(409).send({
      message: "Store already exist, Please choose another name",
      code: 409,
    });
  }
  // ask question
  const store = new Store({
    name: req.body.name,
    country: req.body.country,
    city: req.body.city,
    market: req.body.market, //area
    storeCategory: req.body.storeCategory,
    location: req.body.location, //captain -->
    image: req.body.image,
  });

  const createdStore = await store.save();
  if (!createdStore) {
    return res.status(201).send({
      messsage: "server error",
      code: 201,
    });
  } else {
    return res.status(200).send({
      message: "created successfully",
      code: 200,
    });
  }
});

module.exports = router;
