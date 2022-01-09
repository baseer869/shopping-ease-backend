const sequelize = require("../config/db.config");
const Market = require("../models/market");

// add market
module.exports.addMarket = async (req, res) => {
  sequelize.sync().then(async () => {
    const created = await Market.findOne({ where: { name: req.body.name } });
    if (created) {
      return res.status(409).send({
        message: `market name already exist`,
        code: 409,
        success: true,
        error: false,
      });
    }
    try {
      const isMarket = await Market.create({
        name: req.body.name,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city: req.body.city,
      });

      //    save to db
      if (isMarket) {
        return res.status(200).send({
          code: 200,
          message: "Market sucessfully added",
          markets: isMarket,
          error: false,
        });
      }
      if (!isMarket) {
        return res.status(400).send({
          code: 400,
          message: `${"Not added"}`,
        });
      }
    } catch (error) {
      return res.status(400).send({
        code: 404,
        message: "Something went wrong",
      });
    }
  });
};

// list market

module.exports.listMarket = async (req, res) => {
  sequelize.sync().then(async () => {
    try {
      let list;
      let findQuery = {
        where: { city: req.query.city },
      };
      list = await Market.findAll({ where: { city: req.query.city } });
      if (list) {
        return res.status(200).send({
          message: `fetched successful`,
          code: 200,
          data: list,
          error: false,
        });
      } else {
        return res.status(400).send({
          code: 400,
          message: "failed to fetch",
          data: list,
          error: false,
        });
      }
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: "Something went wrong",
      });
    }
  });
};


// https://towardsdatascience.com/association-rules-2-aa9a77241654