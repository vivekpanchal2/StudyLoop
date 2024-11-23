const { instance } = require("../config/razorpay");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const { mailSender } = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mails/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mails/templates/paymentSuccessEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/courseProgressModel");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  try {
    if (courses.length === 0) {
      return res.json({
        success: false,
        message: "Please provide valid course ID",
      });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
      let course;
      try {
        course = await Course.findById(course_id);
        if (!course) {
          return res.json({
            success: false,
            message: "Could not find the course",
          });
        }

        const uid = new mongoose.Types.ObjectId(userId);

        if (course?.studentsEnrolled?.includes(uid)) {
          return res.status(200).json({
            success: false,
            message: "Student is already enrolled",
          });
        }
        totalAmount += course.price;
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      return res.status(200).json({
        success: true,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifySignature = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const { courses } = req.body;
  const userId = req.user.id;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment details are incomplete",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const enrolleStudent = async (courses, userId) => {
    if (!courses || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid courses and user ID",
      });
    }
    try {
      for (const course_id of courses) {
        const course = await Course.findByIdAndUpdate(
          course_id,
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );

        const user = await User.updateOne(
          { _id: userId },
          { $push: { courses: course_id } },
          { new: true }
        );

        const newCourseProgress = new CourseProgress({
          userId: userId,
          courseId: course_id,
        });

        await newCourseProgress.save();

        await User.findByIdAndUpdate(
          userId,
          {
            $push: { courseProgress: newCourseProgress._id },
          },
          { new: true }
        );
        const recipient = await User.findById(userId);
        const courseName = course.courseName;
        const courseDescription = course.courseDescription;
        const thumbnail = course.thumbnail;
        const userEmail = recipient.email;
        const userName = recipient.firstName + " " + recipient.lastName;
        const emailTemplate = courseEnrollmentEmail(
          courseName,
          userName,
          courseDescription,
          thumbnail
        );
        await mailSender(
          userEmail,
          `You have successfully enrolled for ${courseName}`,
          emailTemplate
        );
      }
      return res.status(200).json({
        success: true,
        message: "Payment successful",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (generatedSignature === razorpay_signature) {
      await enrolleStudent(courses, userId);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { amount, paymentId, orderId } = req.body;
  const userId = req.user.id;
  if (!amount || !paymentId) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid payment details",
    });
  }
  try {
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      `StudyLoop Payment successful`,
      paymentSuccessEmail(
        amount / 100,
        paymentId,
        orderId,
        enrolledStudent.firstName,
        enrolledStudent.lastName
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
