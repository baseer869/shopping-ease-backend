const sequelize = require("../config/db.config");
const Product = require("../models/product");
const Shop = require("../models/shop");

require("dotenv/config");

const multer = require("multer");
const Category = require("../models/productCategory");
const { Op } = require("sequelize");

//ADD PRODUCT TO SHOP
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid Image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split("").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];

    cb(null, `${Date.now()}-${fileName}.${extension}`);
  },
});
module.exports.upload = multer({ storage: storage });

module.exports.addProduct = async (req, res) => {
  sequelize.sync().then(async () => {
    // const filename = req.file.filename
    const basePath = `${req.protocol}://${req.get("host")}/`;
    const shop = await Product.create(req.body);

    //    save to db
    if (shop) {
      return res.status(200).send({
        message: "Product added",
        shop: shop,
        code: 200,
        success: true,
      });
    }
    if (!shop) {
      return res.status(400).send({
        message: `${"mnlkjlk"}`,
      });
    }
  });
};

//LIST PRODUCT BY ID

module.exports.ListProduct = async (req, res) => {
  try {
    sequelize.sync().then(async () => {
      let shopId = req.query.id;
      let categoryId = req.query.categoryId;

      if (shopId && categoryId) {
        let findQuery = {
          where: { ShopId: req.query.id, CategoryId: req.query.categoryId },
        };
        const list = await Product.findAll(findQuery);
        if (!list) {
          return res.status(409).send({
            message: `No product`,
            code: 409,
            success: true,
            data: [],
          });
        }
        return res.status(200).send({
          code: 200,
          error: false,
          message: "success",
          data: {
            result: list,
          },
        });
      } else if (shopId) {
        let findQuery = {
          where: { ShopId: shopId },
        };
        const list = await Product.findAll(findQuery);
        if (!list) {
          return res.status(409).send({
            message: `No product`,
            code: 409,
            success: true,
            data: [],
          });
        }
        return res.status(200).send({
          code: 200,
          error: false,
          message: "success",
          data: {
            result: list,
          },
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "DB Error",
        });
      }
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Server error",
    });
  }
};

// DELETE PRODUCT BY ID
module.exports.deleteProduct = async (req, res) => {
  sequelize.sync().then(async () => {
    const product = await Product.destroy({
      where: { ShopId: req.body.ShopId, id: req.body.id },
    });
    if (!product) {
      return res.status(409).send({
        message: `No product found `,
        code: 409,
        success: true,
        product: product,
      });
    }
    return res.status(200).send({
      code: 200,
      error: false,
      message: "success",
      product: product,
    });
  });
};

// UPDATE PRODUCT BY ID
module.exports.updateProduct = async (req, res) => {
  sequelize.sync().then(async () => {
    const product = await Product.findOne({
      where: { ShopId: req.body.ShopId, id: req.body.id },
    });
    if (!product) {
      return res.status(409).send({
        message: `No product found with this id.`,
        code: 409,
        success: true,
        product: product,
      });
    }
    //update product
    // const filename = req.file.filename
    // const basePath = `${req.protocol}://${req.get('host')}/uploads/`
    const values = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discounted_price: req.body.discounted_price,
      qunatity_Available: req.body.qunatity_Available,
      attachement: `${req.body.attachement}`,
      product_available: req.body.product_available,
    };
    const condition = { where: { ShopId: req.body.ShopId, id: req.body.id } };
    const option = { multi: true };

    const updated = await Product.update(values, condition, option);
    if (updated) {
      return res.status(200).send({
        code: 200,
        error: false,
        message: "success",
        updatedProduct: updated,
      });
    } else {
      return res.status(200).send({
        code: 400,
        error: false,
        message: "something went wrong, try again",
        updatedProduct: updated,
      });
    }
  });
};

//change product status

module.exports.changeProductStatus = async (req, res) => {
  sequelize.sync().then(async () => {
    const condition = { where: { ShopId: req.body.ShopId, id: req.body.id } };

    const product = await Product.update(
      { product_available: req.body.product_available },
      condition
    );
    if (!product) {
      return res.status(409).send({
        message: `No product found `,
        code: 409,
        success: true,
        product: product,
      });
    }
    console.log(product);
    return res.status(200).send({
      code: 200,
      error: false,
      message: "success",
      product: product,
    });
  });
};

module.exports.searchProduct = async (req, res, next) => {
  try {
    let { search } = req.query;

    let findQuery = {
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `${search}%`
            }
          },
        ]
        },
        include:{
          model: Shop,
          as:'Shop',
          attributes :['shop_name']
        }
        
    };
    let list = await Product.findAll(findQuery);
    if (!list) {
      return res.status(200).json({
        status: 200,
        message: "No Record Found",
        data: [],
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Fetch successfully",
        data: {
          result: list,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message:"Server error",
    });
  }
};


