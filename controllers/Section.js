const { populate } = require("dotenv");
const Course = require("../models/course");
const Section = require("../models/section");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!courseId || !sectionName) {
      return res.status(400).json({
        success: true,
        message: "Missing properties",
      });
    }

    const newSection = Section.create({ sectionName });

    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updateCourse,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!courseId || !sectionName || !sectionId) {
      return res.status(400).json({
        success: true,
        message: "Missing properties",
      });
    }

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: section,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: True,
      message: "Section deleted Successfully",
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
