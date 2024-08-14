const mongoose = require("mongoose");
const subSection = require("./subSectionModel");

const sectionSchema = mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subSection",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Section", sectionSchema);
