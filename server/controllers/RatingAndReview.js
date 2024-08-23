const { default: mongoose } = require("mongoose");
const Course = require("../models/courseModel");
const RatingAndReview = require("../models/ratingAndReviewModel");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user;
    const { courseId, rating, review } = req.body;

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });
    console.log(courseDetails);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in course",
      });
    }

    const alreadyReviewed = await RatingAndReview.find({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed.length > 0) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }

    const ratingReview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
    });

    const updatedCourseDetails = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReview: ratingReview._id,
        },
      },
      { new: true }
    );

    console.log(updatedCourseDetails);

    return res.status(200).json({
      success: true,
      message: "Rating and Review created Successfully",
      ratingReview,
      updatedCourseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid courseId provided.",
      });
    }

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstname lastname email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    res.status(200).json({
      success: true,
      message: "All review fetched successfully",
      allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
