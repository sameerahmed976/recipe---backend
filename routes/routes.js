const express = require("express");
const { userController } = require("../controllers/userController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const router = express.Router();

// register user
router.route("/").post(userController.registerUser);
router.post("/auth", userController.loginUser);
router.post("/logout", userController.logoutUser);
router
  .route("/profile")
  .get(protect, userController.getProfile)
  .put(protect, userController.updateProfile);
module.exports = router;
