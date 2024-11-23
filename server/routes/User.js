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

const { getAllInstructors, getAllStudents } = require("../controllers/Profile");
const { auth, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOtp);
router.post("/changepassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

router.get("/all-students", auth, isAdmin, getAllStudents);
router.get("/all-instructors", auth, isAdmin, getAllInstructors);

module.exports = router;
