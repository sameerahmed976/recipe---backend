const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/categoryModel.js");
const Recipe = require("./models/recipeModel.js");
const category = require("./data/categories.json");
const recipe = require("./data/recipes.json");
dotenv.config({});
// console.log(`* ~ file: updateDB.js:5 ~ category:`, category);
// const recipe = require("./data/recipes.json");
// console.log(`* ~ file: updateDB.js:7 ~ recipe:`, recipe);

const updateDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected at the port ${connect.connection.host}`);

    await Category.insertMany(category);
    await Recipe.insertMany(recipe);

    // await Category.deleteMany();
    // await Recipe.deleteMany();

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// updateDB();
