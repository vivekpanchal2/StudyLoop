const { uploadImageToCloudinary } = require("../utils/imageUpload");

const Section = require("../models/sectionModel");
const SubSection = require("../models/subSectionModel");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description, timeDuration } = req.body;

    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    const video = req.files.videoFile;

    const uploadVideoDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    console.log(uploadVideoDetails);

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration: `${uploadVideoDetails.duration}`,
      description,
      videoUrl: uploadVideoDetails.secure_url,
    });

    //update Section

    const updatedSection = await Section.findByIdAndUpdate(
      {
        _id: sectionId,
      },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { title, subSectionId, sectionId, description } = req.body;

    console.log({ title, subSectionId, sectionId, description });

    if (!subSectionId || !title || !sectionId || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    const subSectionDetails = await SubSection.findById(subSectionId);

    if (!subSectionDetails) {
      return res.status(404).json({
        success: false,
        message: "Sub-Section not found",
      });
    }

    if (title !== undefined) {
      subSectionDetails.title = title;
    }

    if (description !== undefined) {
      subSectionDetails.description = description;
    }

    if (req.files || req.files.videoFile !== undefined) {
      const video = req.files.videoFile;
      const uploadVideoDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );

      subSectionDetails.videoUrl = uploadVideoDetails.secure_url;
      subSectionDetails.timeDuration = `${uploadVideoDetails.duration}`;
    }
    console.log("Yaha tak ka complete hai iske baad chuda hai");

    await subSectionDetails.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    console.log("updated section", updatedSection);

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    await Section.findByIdAndUpdate(sectionId, {
      $pull: {
        subSection: subSectionId,
      },
    });

    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " Some Internal Server Error Occured",
    });
  }
};
