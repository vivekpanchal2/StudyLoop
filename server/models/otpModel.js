const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const emailTemplate = require("../mails/templates/emailVerificationTemplate");

const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email From StudyLoop",
      emailTemplate(otp)
    );

    console.log("Mail send successfully ", mailResponse);
  } catch (err) {
    console.error("Error occures while sending mails", err);
    throw err;
  }
}

OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
