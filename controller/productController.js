const { default: slugify } = require("slugify");
const produuctModel = require("../models/productModel");
const categoryModel = require('../models/ccategoryModel')
const orderModel = require('../models/orderModel')
const fs = require("fs");
const brainTree = require('braintree')
require("dotenv").config();

var gateway = new brainTree.BraintreeGateway({
  environment: brainTree.Environment.Sandbox,
  merchantId:process.env.MERCHAND_ID,
  publicKey:process.env.MERCHAND_PUBLIC_KEY,
  privateKey:process.env.MERCHAND_PRIVATE_KEY
})
exports.createProductController = async (req, res) => {
  try {
    const { shipping, quantity, category, price, description, slug, name } =
      req.fields;
    const { photo } = req.files;
    console.log(shipping);

    // validation
    switch (true) {
      case !name:
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });

      case !category:
        return res.status(400).json({
          success: false,
          message: "Category is required",
        });
      case !price:
        return res.status(400).json({
          success: false,
          message: "Price is required",
        });
      case !description:
        return res.status(400).json({
          success: false,
          message: "description is required",
        });
      case photo.size === 0 && photo.size <= 10240:
        return res.status(400).json({
          success: false,
          message: "photo is required and size should not be exceed 10mb ",
        });
      case !quantity:
        return res.status(400).json({
          success: false,
          message: "Quantity is required",
        });
    }

    const product = new produuctModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).json({
      success: true,
      message: "successfully created",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed creating product",
    });
  }
};
exports.updateProductController = async (req, res) => {
  try {
    // console.log("ssdasd")
    const { shipping, quantity, category, price, description, name } =
      req.fields;
    const { photo } = req.files;
    // console.log(shipping,"shipping")

    // validation
    switch (true) {
      case !name:
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });

      case !category:
        return res.status(400).json({
          success: false,
          message: "Category is required",
        });
      case !price:
        return res.status(400).json({
          success: false,
          message: "Price is required",
        });
      case !description:
        return res.status(400).json({
          success: false,
          message: "description is required",
        });
      case photo?.size === 0 && photo?.size <= 10240:
        return res.status(400).json({
          success: false,
          message: "photo is required and size should not be exceed 10mb ",
        });
      case !quantity:
        return res.status(400).json({
          success: false,
          message: "Quantity is required",
        });
    }
    const updatedProduct = await produuctModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }
    await updatedProduct.save();

    res.status(201).json({
      success: true,
      message: "successfully updated",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed udating product",
    });
  }
};
exports.getAllProductController = async (req, res) => {
  try {
    const products = await produuctModel
      .find({})
      .populate("category")
      .select("-photo")
      // .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "all products",
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed fetching products",
    });
  }
};
exports.getSingleProductController = async (req, res) => {
  try {
    const product = await produuctModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).json({
      success: true,
      message: "single Product fetched",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed fetching single products",
    });
  }
};
exports.getSingleProductPicController = async (req, res) => {
  try {
    const product = await produuctModel
      .findById(req.params.pid)
      .select("photo");
    if (product?.photo?.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed fetching single products picture",
    });
  }
};
exports.deleteProductController = async (req, res) => {
  try {
    await produuctModel.findByIdAndDelete(req.params.pid);
    res.status(200).json({
      success: true,
      message: "product deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed Deleting products",
    });
  }
};
exports.productFilterController = async (req, res) => {
  try {
    const { selected, radio } = req.body;
    let args = {};
    if (selected.length > 0) args.category = selected;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await produuctModel.find(args).select("-photo");
    
    // console.log(selected,radio,products)
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed filtering products",
    });
  }
};
exports.productCountController = async (req, res) => {
  try {
    const total = await produuctModel.find({}).estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "total count fetched",
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Product Count failed ",
    });
  }
};
exports.productListController = async (req, res) => {
  try {
    const limit = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await produuctModel
      .find({})
      .select("-photo")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "product list fetched",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed fetching product list",
    });
  }
};
exports.searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await produuctModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    res.status(200).json({
      success: true,
      message: "Search Results",
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed search product ",
    });
  }
};
exports.relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await produuctModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");

      res.status(400).json({
        success : true,
        message : "related products",
        products
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed search product ",
    });
  }
};
exports.categoryRelatedProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug:req.params.slug})
    const products = await produuctModel.find({category}).populate("category").limit(6);
    res.status(200).json({
      success : true,
      message : "product of chosen category fetched",
      products,
      category
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed get product related category ",
    });
  }
}
exports.categoryRelatedAllProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug:req.params.slug})
    const products = await produuctModel.find({category}).populate("category");
    res.status(200).json({
      success : true,
      message : "product of chosen category fetched",
      products,
      category
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed get product related category ",
    });
  }
}
exports.braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({},function (err, response){
      if (err) res.status(500).json({
        success: false,
        message: "failed gernating token",
        error:err.message
      })
      else{
        res.status(200).json({
          success : true,
          message : "token generating successful",
          token : response
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed get generating token for payment getway api",
    });
  }
}
exports.braintreePaymentController = (req, res) => {
 try {

  const { cart, nonce } = req.body;
  let total = 0;
  cart.map((i) => {
    total += i.price 
  });

  let  newTransaction = gateway.transaction.sale({
    amount:total,
    paymentMethodNonce:nonce,
    options:{
      submitForSettlement: true
    }
  },
  function(payerror, result){
    if(result){
      const order = new orderModel({
        products : cart,
        payment:result,
        buyer: req.userAuth._id
      }).save()
      res.status(200).json({
        success : true,
        message : "transaction successfully completed",
        ok:true
      })
    }
    else{
      res.status(500).json({
        success : false,
        message: "failed transaction try again",
        error:payerror.message
      })
    }
  }
  
  )
  
 } catch (error) {
  res.status(500).json({
    success: false,
    error: error.message,
    message: "transaction failed please try again",
  });
 }
}


exports.insertOrderDataController =  async (req, res) => {
  try {
    
    const {productId, amount, buyerId, status} = req.body;
   
    const order = new orderModel({
      products : productId,
      payment:amount,
      buyer: buyerId,
      status:status
    }).save();

    res.status(200).json({
      success : true,
      message : "order data saver",
      ok:true
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: " failed inserting orders data",
    });
  }
}