const express = require("express");
const { recipeController } = require("../controllers/recipeController.js");
const router = express.Router();
router.route("/allRecipes").get(recipeController.getAllRecipes);

module.exports = router;
