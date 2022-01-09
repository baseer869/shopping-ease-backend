const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("shoppingEase", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((success) => {
    console.log(`Database connection successfull...`);
  })
  .catch((error) => {
    console.log(`Not connected to database successfull...${error}`);
  });

  module.exports = sequelize;