const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const courseModel = require("../models/courseModel");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, firstName, lastName, gender } =
      req.body;

    const id = req.user.id;

    const userDetails = await User.findById(id).populate("additionalDetails");
    console.log(userDetails);
    const profile = await Profile.findById(userDetails.additionalDetails._id);

    if (userDetails) {
      userDetails.firstName = firstName || userDetails.firstName;
      userDetails.lastName = lastName || userDetails.lastName;
      await userDetails.save();
    }

    if (profile) {
      profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
      profile.about = about || profile.about;
      profile.gender = gender || profile.gender;
      profile.contactNumber = contactNumber || profile.contactNumber;
      await profile.save();
    }

    const updatedUserDetails = await User.findById(id).populate(
      "additionalDetails"
    );

    return res.json({
      success: true,
      message: "Profile updated successfully",
      profile,
      userDetails: updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
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
    ).populate("additionalDetails");

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

exports.getEnrolledCourses = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const enrolledCourses = await User.findById(id)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
        },
      })
      .populate("courseProgress")
      .exec();
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: enrolledCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const id = req.user.id;

    const courseData = await courseModel.find({ instructor: id });
    const courseDetails = courseData.map((course) => {
      totalStudents = course?.studentsEnrolled?.length || 0;
      totalRevenue = course?.price * totalStudents;

      const courseStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudents,
        totalRevenue,
      };
      return courseStats;
    });
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
