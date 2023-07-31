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

exports.recipeController = {
  getAllRecipes,
};
