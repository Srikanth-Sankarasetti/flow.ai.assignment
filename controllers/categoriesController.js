const AppError = require("../utils/appError");
const Categories = require("./../models/categories");
const catchAsync = require("./../utils/catchAsync");

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const { id, email } = req;
  console.log(id);
  const categories = await Categories.find({ user: id }).populate("user");
  if (!categories) {
    return next(new AppError("No categories found", 404));
  }
  res.status(200).send({
    status: "success",
    results: categories.length,
    categories,
  });
});

exports.CategoriesCreate = catchAsync(async (req, res, next) => {
  const { id, email } = req;
  const { name, type } = req.body;
  const categories = await Categories.create({
    name: name,
    type: type,
    user: id,
  });
  res.status(200).send({
    status: "Success",
    message: "categorie created",
    categories,
  });
});

exports.updateCatergories = catchAsync(async (req, res, next) => {
  const { id } = req;
  await Categories.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });
  res.status(200).send({
    status: "Success",
    message: "categories updated succesfully",
  });
});
