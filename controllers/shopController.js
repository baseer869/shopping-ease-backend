const sequelize = require("../config/db.config");
require("dotenv/config");
const multer = require("multer");

// model
const Shop = require("../models/shop");
const ShopCategory = require("../models/storeCategory");
const Markets = require("../models/market");
// const FILE_TYPE_MAP ={
//   'image/png':'png',
//   'image/jpeg':'jpeg',
//   'image/jpg':'jpg'
// }
//
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype]
//     let uploadError = new Error("Invalid Image type");
//     if(isValid){
//        uploadError = null
//     }
//     cb(uploadError, './uploads')
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split('').join('-');
//     const extension = FILE_TYPE_MAP[file.mimetype]

//     cb(null,`${Date.now()}-${fileName}.${extension}`)
//   }
// })

// module.exports.upload = multer({ storage: storage });

module.exports.addShop = async (req, res) => {
  sequelize.sync().then(async () => {
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const created = await Shop.findOne({
      where: { shop_name: req.body.shop_name },
    });
    console.log("created-->", created);
    if (created) {
      return res.status(409).send({
        message: `Shop name ${req.body.shop_name}  already exist, try with different name`,
        code: 409,
      });
    }
    const shop = await Shop.create({
      shop_name: req.body.shop_name,
      shopCategoryId: req.body.shopCategoryId,
      shop_category: req.body.shop_category,
      UserId: req.body.seller_id,
      market_name: req.body.market_name,
      shop_city: req.body.shop_city,
      lat: req.body.lat,
      shop_image: req.body.shop_image,
      long: req.body.long,
      isOpen: req.body.isOpen,
      totalEarned: req.body.totalEarned,
      verified: req.body.verified,
      marketId: req.body.marketId
    });

    //    save to db
    if (shop) {
      return res.status(200).send({
        message: "Shop added successfully",
        shop: shop,
        code: 200,
      });
    }
    if (!shop) {
      return res.status(400).send({
        message: `${"mnlkjlk"}`,
      });
    }
  });
};

//LIST OF SHOP

module.exports.ListShop = async (req, res) => {
  sequelize.sync().then(async () => {
    try {
      const list = await ShopCategory.findAll({
        include: [        
          {
          model: Shop,
          where: { marketId: req.query.id },
        }
        ],
      });
      if (!list) {
        return res.status(409).send({
          message: `No shops found`,
          code: 409,
          success: true,
          data: [],
        });
      }
      return res.status(200).send({
        code: 200,
        error: false,
        message: "Fetch Successfully",
        data: list,
      });  
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message:"Server Error, try again",
        data:[]
      })
    }
    
  });
};

//Find "PENDING SHOP" ONLY
//LIST SHOP  "PENDING SHOP"

module.exports.ListPendingShop = async (req, res) => {
  sequelize.sync().then(async () => {
    const list = await Shop.findAll({ where: { verified: req.body.verified } });
    if (!list) {
      return res.status(409).send({
        message: `No shop found`,
        code: 409,
        success: true,
        shop: list,
      });
    }
    return res.status(200).send({
      code: 200,
      error: false,
      message: "Register Shop",
      shop: list,
    });
  });
};

//UPDATE SHOP STATUS
module.exports.updateStatus = async (req, res) => {
  sequelize.sync().then(async () => {
    const update = await Shop.update(
      { verified: req.body.verified },
      { where: { id: req.body.id } }
    );
    if (!update) {
      return res.status(409).send({
        message: `No update Found`,
        code: 409,
        success: true,
        shop: update,
      });
    }
    return res.status(200).send({
      code: 200,
      error: false,
      message: "Shop updated",
      shop: update,
    });
  });
};

// FIND SHOP STATUS
module.exports.checkShopStatus = async (req, res) => {
  sequelize.sync().then(async () => {
    const status = await Shop.findAll({
      where: { UserId: req.body.UserId },
      attributes: ["verified"],
    });
    if (!status) {
      return res.status(409).send({
        message: `Shop not exist`,
        code: 409,
        success: true,
        shop: status,
      });
    }
    return res.status(200).send({
      code: 200,
      error: false,
      message: "Shop",
      shop: status,
    });
  });
};
