const Course = require("../models/courseModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const Section = require("../models/sectionModel");
const SubSection = require("../models/subSectionModel");
const CourseProgress = require("../models/courseProgressModel");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.createCourse = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      status,
      instructions: _instructions,
      tag: _tag,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !instructions.length ||
      !tag.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "category Details not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    });

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // update categorySchema

    await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create course ",
      error: error.message,
    });
  }
};

exports.showAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        thumbnail: true,
        whatYouWillLearn: true,
        price: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course Fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Courses ",
      error: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log(courseId);

    const courseDetails = await Course.findById(courseId)
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category")
      .populate({
        path: "ratingAndReview",
        populate: {
          path: "user",
          select: "firstName lastName accountType image",
        },
      })
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course details fetched succsessfully",
      courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    console.log(courseId);
    console.log(req.params);

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  console.log("check pointzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

  try {
    const { courseId } = req.body;

    console.log("req.body", req.body);
    console.log(courseId);
    const course = await Course.findById(courseId);

    console.log(course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("check point one");

    // student field is not working rn
    // Unenroll students from the course
    // const studentsEnrolled = course.studentsEnroled;
    // for (const studentId of studentsEnrolled) {
    //   await User.findByIdAndUpdate(studentId, {
    //     $pull: { courses: courseId },
    //   });
    // }

    console.log("check point two");

    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      await Section.findByIdAndDelete(sectionId);
    }
    console.log("check point three");

    await Course.findByIdAndDelete(courseId);

    console.log("check point four");

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    console.log("Flagggggg");

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    console.log("------------------------------------------------------------");
    console.log(courseDetails);
    console.log("------------------------------------------------------------");

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    console.log({ courseDetails, totalDuration, courseProgressCount });

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
