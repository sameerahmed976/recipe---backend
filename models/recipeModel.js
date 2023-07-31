const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "This field is required  name",
    },
    description: {
      type: String,
      required: "This field is required  description",
    },
    email: {
      type: String,
      required: "This field is required email",
    },
    ingredients: {
      type: Array,
      required: "This field is required ingredients",
    },
    category: {
      type: String,
      enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
      required: "This field is required category",
    },
    image: {
      type: String,
      required: "This field is required  image",
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
