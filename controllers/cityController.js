const sequelize = require("../config/db.config");
const City = require("../models/city");
require("dotenv/config");


module.exports.addCity = async (req, res) => {
  sequelize.sync().then(async () => {
    const created = await City.findOne({ where: { name: req.body.name } });
    if (created) {
      return res.status(409).send({
        code: 409,
        message: `City name ${req.body.name}  already exist:`,
      });
    }
    try {
      const category = City.create({
        name: req.body.name,
      });

      if (category) {
        return res.status(200).send({
          message: "city added",
          category: category,
          code: 200,
        });
      }
      if (!category) {
        return res.status(400).send({
          message: `${"city not added"}`,
        });
      }
    } catch (error) {
      return res.status(400).send({
        code: 400,
        message: `${"Something went wrong"}`,
      });
    }
  });
};
