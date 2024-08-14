const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

exports.updateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth = "", about, contactNumber } = req.body;

    if (!gender || !contactNumber || !about) {
      return res.status(400).json({
        success: false,
        message: "Required Fileds are should must be filled",
      });
    }
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User is not defined",
      });
    }

    const userDetails = await User.findById(userId);
    const profile = await Profile.findById(userDetails.additionalDetails);

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    await profile.save();

    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error :  " + error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDeatails = User.findById(userId);

    if (!userDeatails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    //delete course : Empty
    await Profile.findByIdAndDelete(userDeatails.additionalDetails);
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      meassage: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const UserId = req.user.id;
    const userDetails = await User.findById(UserId)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;

    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    console.log(image);

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        image: image.secure_url,
      },
      { new: true }
    );

    res.send({
      success: true,
      message: "Image uploaded successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
