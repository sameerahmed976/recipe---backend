const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel.js");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// @desc get all recipes
// @route  GET  /api/v1/allRecipes
// @access Public

const getAllRecipes = asyncHandler(async (req, res) => {
  const limitNumber = 5;
  const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
  const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
  const american = await Recipe.find({ category: "American" }).limit(
    limitNumber
  );
  const chinese = await Recipe.find({ category: "Chinese" }).limit(limitNumber);
  const allRecipes = await Recipe.find({}).sort({ _id: -1 });
  // console.log(
  //   `* ~ file: recipeController.js:17 ~ getAllRecipes ~ allRecipes:`,
  //   allRecipes
  // );
  let count = await Recipe.find().countDocuments();
  let random = Math.floor(Math.random() * count);
  let randomRecipes = await Recipe.findOne().skip(random).exec();
  const food = { latest, thai, american, chinese };

  res.status(200).json({
    randomRecipes,
    food,
    allRecipes,
  });
});

// @desc get all recipes
// @route  GET  /api/v1/allRecipes
// @access Public

const getProductId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(`* ~ file: recipeController.js:37 ~ getProductId ~ id:`, id);

  const product = await Recipe.findById(id);
  // console.log(
  //   `* ~ file: recipeController.js:39 ~ getProductId ~ product:`,
  //   product
  // );

  if (!product) {
    res.status(400);
    throw new Error(" no product found");
  }

  res.status(200).json({
    product,
  });
});

// @desc post recipe image
// @route  POST  /api/v1/allRecipes/upload
// @access Private

// const uploadImage = asyncHandler(async (req, res) => {
//   console.log(req.files);

//   if (!req.files) {
//     throw new Error("No File Uploaded");
//   }
//   const productImage = req.files.image;

//   if (!productImage.mimetype.startsWith("image")) {
//     throw new Error("Please Upload Image");
//   }

//   const maxSize = 1024 * 1024;

//   if (productImage.size > maxSize) {
//     throw new Error("Please upload image smaller than 1MB");
//   }

//   const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
//     use_filename: true,
//     folder: "file-upload",
//   });

//   fs.unlinkSync(productImage.tempFilePath);
//   return res.status(200).json({ image: { src: result.secure_url } });
// });

// @desc post recipe
// @route  POST  /api/v1/allRecipes
// @access Private

// categories: "Thai";
// email: "john@gmail.com";
// ingredients: (2)[(" asdasdasdasdasd", " adasdas")];
// recipeDescription: "asdasd";
// recipeImage: "C:\\fakepath\\view-all.jpg";
// recipeName: "dsaddsadasdasdasdasdasd";
const postARecipe = asyncHandler(async (req, res) => {
  const { name, description, source, email, ingredients, category } = req.body;

  if (!name || !description || !source || !email || !ingredients || !category) {
    res.status(400);

    throw new Error("Please input all Fields");
  }

  if (!req.files) {
    throw new Error("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new Error("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new Error("Please upload image smaller than 1MB");
  }

  const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
    use_filename: true,
    folder: "file-upload",
  });
  fs.unlinkSync(productImage.tempFilePath);
  const recipe = await Recipe.create({
    name,
    description,
    source: result.secure_url,
    email,
    ingredients,
    category,
    image: result.secure_url,
  });

  if (!recipe) {
    throw new Error("Please try again");
  }

  return res.status(200).json({
    message: "success submitted the recipe",
  });
});

exports.recipeController = {
  getAllRecipes,
  getProductId,
  // uploadImage,
  postARecipe,
};
