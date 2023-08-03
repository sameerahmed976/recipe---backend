const express = require("express");
const { recipeController } = require("../controllers/recipeController.js");
const router = express.Router();
router.route("/allRecipes").get(recipeController.getAllRecipes);
router.route("/:id").get(recipeController.getProductId);

module.exports = router;
