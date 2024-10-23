const express = require("express");
const { routeProtector } = require("./../controllers/authController");
const {
  getAllCategories,
  CategoriesCreate,
  updateCatergories,
} = require("./../controllers/categoriesController");
const router = express.Router();

router
  .route("/")
  .get(routeProtector, getAllCategories)
  .post(routeProtector, CategoriesCreate);

router.route("/:id").post(routeProtector, updateCatergories);

module.exports = router;
