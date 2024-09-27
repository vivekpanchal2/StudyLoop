const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    console.log([token]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invaild",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating Token",
    });
  }
};

//------------------- Student -------------------

exports.isStudent = (req, res, next) => {
  try {
    const accountType = req.user.accountType;
    if (accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Student only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User role can't be varified , please try again",
    });
  }
};

//------------------- Instructor -------------------

exports.isInstructor = (req, res, next) => {
  try {
    const accountType = req.user.accountType;
    if (accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User role can't be varified , please try again",
    });
  }
};

//------------------- Admin -------------------

exports.isAdmin = (req, res, next) => {
  try {
    const accountType = req.user.accountType;
    if (accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User role can't be varified , please try again",
    });
  }
};
