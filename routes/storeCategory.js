const express = require("express");
const sequelize = require("../config/db.config");
const ShopCategory = require("../models/storeCategory");
const router = express.Router();

const api = process.env.Api_Url;


// ass store categor
router.post(`${api}/addShopCategory`, async (req, res) => {
  sequelize.sync().then(async () => {
    try {
      const category = await ShopCategory.findOne({ where:  { name: req.body.name }});
      if (category) {
        return res.status(409).send({
          message: "category already exist !",
          code: 409,
          category,
        });
      } 
        let added = await  ShopCategory.create({
          name: req.body.name,
        });
        if (added) {
          return res.status(409).send({
            message: "Saved",
            code: 200,
          });
        } else {
          return res.status(409).send({
            message: " Error while Saved",
            code: 400,
          });
        }
    } catch (error) {
      return res.status(400).send({
        code: 400,
        message: "Something Went Wrong",
        error: true,
      });
    }
  });
});

router.get(`${api}/listCategory`, async (req, res) => {
  try {
    const storeCategory = await ShopCategory.findAll({});
    if (!storeCategory) {
      return res.send({
        message: "Not Found...",
        code: 200,
        data: [],
      });
    } else {
      res.send({
        message: "successfull",
        code: 200,
        list: storeCategory,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong",
      code: 400,
      data: [],
    });
  }
});

module.exports = router;
