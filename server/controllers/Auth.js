const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const Profile = require("../models/profileModel");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mails/templates/passwordUpdate");
const { mailSender } = require("../utils/mailSender");
const profileModel = require("../models/profileModel");
require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    const email = req.body.email;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res
        .status(401)
        .json({ success: false, message: "user already exists" });
    }

    let otp, otpExists;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      otpExists = await OTP.findOne({ otp });
    } while (otpExists);

    const otpPaylod = { email, otp };

    const otpBody = await OTP.create(otpPaylod);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP send successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    if (confirmPassword !== password) {
      res.status(400).json({
        success: false,
        message: "Password amd Confirm-Password value are Different",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User alredy exists" });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("recent otp is ", recentOtp);

    if (recentOtp.length == 0) {
      res.status(400).json({ success: false, message: "OTP not exists" });
      return;
    } else if (otp !== recentOtp[0].otp.toString()) {
      res.status(400).json({ success: false, message: "invalid OTP" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
    });

    const additionalDetail = await profileModel.findById(profileDetails._id);

    const userWithDetails = {
      ...user.toObject(),
      additionalDetails: additionalDetail,
    };

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    console.log(token);

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "User registered successfully",
      token,
      userWithDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User can't registred, please try again",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      success: false,
      meassage: "all fields are required",
    });
  }

  try {
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(501).json({
        success: false,
        meassage: "User is not registered, Please Signup",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      console.log(token);

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      console.log(options);

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login successfully",
      });
    } else {
      return res.status(501).json({
        success: false,
        message: "incorrect email or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);

    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
