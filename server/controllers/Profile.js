const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const courseModel = require("../models/courseModel");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/courseProgressModel");

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

    let userDetails = await User.findOne({ _id: id })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    console.log("-----------------------------------");
    console.log(userDetails.courses[0].courseContent);

    userDetails = userDetails.toObject();

    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: id,
      });

      courseProgressCount = courseProgressCount?.completedVideos.length;

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }

    console.log(userDetails);

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
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

exports.getAllStudents = async (req, res) => {
  try {
    const allStudentsDetails = await User.find({
      accountType: "Student",
    })
      .populate("additionalDetails")
      .populate("courses")
      .sort({ createdAt: -1 });

    const studentsCount = await User.countDocuments({
      accountType: "Student",
    });

    res.status(200).json({
      allStudentsDetails,
      studentsCount,
      message: "All Students Data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while fetching all students",
      error: error.message,
    });
  }
};

exports.getAllInstructors = async (req, res) => {
  try {
    const allInstructorsDetails = await User.find({
      accountType: "Instructor",
    })
      .populate("additionalDetails")
      .populate("courses")
      .sort({ createdAt: -1 });

    const instructorsCount = await User.countDocuments({
      accountType: "Instructor",
    });

    res.status(200).json({
      allInstructorsDetails,
      instructorsCount,
      message: "All Instructors Data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while fetching all Instructors",
      error: error.message,
    });
  }
};
