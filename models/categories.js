const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "categorie must have name"],
  },
  type: {
    type: String,
    required: [true, "category must have type"],
    enum: ["income", "expense"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: [true, "categorie must belog to user"],
  },
});

const Categories = mongoose.model("CATEGORIES", categoriesSchema);

module.exports = Categories;
