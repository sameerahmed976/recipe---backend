const express = require("express");
const { recipeController } = require("../controllers/recipeController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();
router
  .route("/allRecipes")
  .get(recipeController.getAllRecipes)
  .post(protect, recipeController.postARecipe);
router.route("/:id").get(recipeController.getProductId);
router.route("/upload").post(protect, recipeController.uploadImage);

module.exports = router;
