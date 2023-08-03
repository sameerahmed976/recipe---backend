const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel.js");

const Category = require("../models/categoryModel.js");

// @desc get all recipes
// @route  GET  /api/v1/allRecipes
// @access Public

const getAllRecipes = asyncHandler(async (req, res) => {
  const limitNumber = 5;
  const categories = await Category.find({}).limit(limitNumber);
  const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
  const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
  const american = await Recipe.find({ category: "American" }).limit(
    limitNumber
  );
  const chinese = await Recipe.find({ category: "Chinese" }).limit(limitNumber);
  let count = await Recipe.find().countDocuments();
  let random = Math.floor(Math.random() * count);
  let randomRecipes = await Recipe.findOne().skip(random).exec();
  const food = { latest, thai, american, chinese };

  res.status(200).json({
    randomRecipes,
    food,
    categories,
  });
});

// @desc get all recipes
// @route  GET  /api/v1/allRecipes
// @access Public

const getProductId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(`* ~ file: recipeController.js:37 ~ getProductId ~ id:`, id);

  const product = await Recipe.findById(id);
  console.log(
    `* ~ file: recipeController.js:39 ~ getProductId ~ product:`,
    product
  );

  if (!product) {
    res.status(400);
    throw new Error(" no product found");
  }

  res.status(200).json({
    product,
  });
});

exports.recipeController = {
  getAllRecipes,
  getProductId,
};
