const sequelize = require("../config/db.config");
const Category = require("../models/productCategory");
require("dotenv/config");

//ADD PRODUCT TO SHOP

module.exports.addCategory = async (req, res) => {
  sequelize.sync().then(async () => {
    const created = await Category.findOne({ where: { name: req.body.name } });
    if (created) {
      return res.status(409).send({
        message: `category name ${req.body.name}  already exist, try with different name`,
        code: 409,
      });
    }

    const category = await Category.create(req.body);

    //    save to db
    if (category) {
      return res.status(200).send({
        message: "category added ",
        category: category,
        code: 200,
      });
    }
    if (!category) {
      return res.status(400).send({
        message: `${"mnlkjlk"}`,
      });
    }
  });
};

module.exports.ListCategory = async (req, res) => {
  try {
    sequelize.sync().then(async () => {
      let findQuery = {
        where: { ShopId: req.query.id },
      };
      const list = await Category.findAll(findQuery);
      if (!list) {
        return res.status(409).send({
          message: `Not Found`,
          code: 409,
          success: true,
          data: [],
        });
      }
      return res.status(200).send({
        code: 200,
        message: "fetch successfully",
        data: {
          result: list,
        },
      });
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: "Server Error",
    });
  }
};
