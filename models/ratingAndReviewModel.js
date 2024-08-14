const mongoose = require("mongoose");

const ratingAndReviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
    index: true,
  },
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);