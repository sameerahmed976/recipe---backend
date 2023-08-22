const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("./models/recipeModel.js");
const recipe = require("./public/recipes.json");
dotenv.config({});
// console.log(`* ~ file: updateDB.js:5 ~ category:`, category);
// const recipe = require("./data/recipes.json");
// console.log(`* ~ file: updateDB.js:7 ~ recipe:`, recipe);

const updateDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`database connected at the port ${connect.connection.host}`);

    await Recipe.insertMany(recipe);

    // await Recipe.deleteMany();
    // console.log("upload success");
    process.exit(0);
  } catch (error) {
    // console.log(`* ~ file: updateDB.js:26 ~ updateDB ~ error:`, error);
    process.exit(1);
  }
};

// updateDB();

// USE V2
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadLocalImages = async () => {
  try {
    const Images = [
      // "./public/uploads/american-food.jpg",
      // "./public/uploads/chinese-food.jpg",
      // "./public/uploads/thai-food.jpg",
      // "./public/uploads/mexican-food.jpg",
      // "./public/uploads/indian-food.jpg",
      // "./public/uploads/spanish-food.jpg",
    ];

    for (const image of Images) {
      const result = await cloudinary.uploader.upload(image);
      // console.log(result.secure_url);
    }

    process.exit(0);
  } catch (error) {
    // console.log(`* ~ file: updateDB.js:60 ~ uploadLocalImages ~ error:`, error);
    process.exit(1);
  }
};

// uploadLocalImages();
