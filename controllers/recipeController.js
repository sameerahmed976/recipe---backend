const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel.js");

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
  console.log(req.files);

  const image = req.files;
  console.log(`* ~ file: recipeController.js:73 ~ postARecipe ~ image:`, image);
  if (!req.files) return res.send("Please upload an image");

  // const cloudFile = await upload(image.tempFilePath);
  console.log(cloudFile);

  const {
    email,
    categories,
    ingredients,
    recipeDescription,
    recipeImage,
    recipeName,
  } = req.body;

  if (
    !email ||
    !categories ||
    !ingredients ||
    !recipeDescription ||
    !recipeImage ||
    !recipeName
  ) {
    res.status(400);
    throw new Error(`Please input all fields`);
  }

  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);

  const recipe = await Recipe.create({
    name: recipeName,
    description: recipeDescription,
    source: recipeImage,
    ingredients: ingredients,
    category: categories,
    image: recipeImage,
    email: email,
  });
  console.log(
    `* ~ file: recipeController.js:97 ~ postARecipe ~ recipe:`,
    recipe
  );

  res.status(200).json({
    recipe,
  });
});

exports.recipeController = {
  getAllRecipes,
  getProductId,
  postARecipe,
};
