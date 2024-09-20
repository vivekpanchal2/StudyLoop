const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  sendOtp,
  changePassword,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOtp);
router.post("/changepassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;
