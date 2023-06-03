const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  allCategoriesController,
  singleCAtegoryController,
  deleteCategoryController,
} = require("../controller/categoryController");
const { model } = require("mongoose");

const router = express.Router();

//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update category

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//all categories
router.get("/categories", allCategoriesController);

//single category
router.get("/single-category/:slug", singleCAtegoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;
