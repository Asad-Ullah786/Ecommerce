const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
  createProductController,
  getAllProductController,
  getSingleProductController,
  getSingleProductPicController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchController,
  relatedProductController,
  categoryRelatedProductController,
  braintreeTokenController,
  braintreePaymentController,
  insertOrderDataController,
  categoryRelatedAllProductController
} = require("../controller/productController");
const router = express.Router();

//product create
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// get all products
router.get('/get-products', getAllProductController)
router.get('/single-products/:slug', getSingleProductController)
router.get('/single-products-pic/:pid', getSingleProductPicController)
router.delete('/delete-product-pic/:pid', deleteProductController)
//filter products
router.post('/product-filter', productFilterController)
router.get('/product-count', productCountController)
router.get('/product-list/:page', productListController)
router.get('/search/:keyword', searchController)
router.get('/related-product/:pid/:cid', relatedProductController)
router.get('/product-category/:slug', categoryRelatedProductController)
router.get('/all-product-category/:slug', categoryRelatedAllProductController)
//
router.get('/braintree/token', braintreeTokenController)
//
router.post('/braintree/payment', braintreePaymentController)
router.post('/insert', insertOrderDataController)


module.exports = router;