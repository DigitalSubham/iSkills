const { instance } = require("../config/razorpay");
const COURSE = require("../models/Course");
const USER = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");

//capture the payment initiate the razorpay order

const capturePayment = async (req, res) => {
  try {
    //get courseId and userId
    const { courseId } = req.body;
    const { userId } = req.user.id;
    //validation
    //valid courseId
    if (!courseId) {
      return res.json({
        success: false,
        message: "Please provide valid course Id",
      });
    }
    //valid courseDetail
    let course;
    try {
      course = await COURSE.findById(courseId);
      if (!course) {
        return res.json({
          success: false,
          message: "Could not able to find the course",
        });
      }
      //check that user has already not buyed the course
      const uid = new mongoose.Types.ObjectId(userId); // in course model in studentEnrolled user data in object so we are also converting userId(which is in string form) to object form
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    //order create
    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency: currency,
      reciept: Math.random(Date.now().toString()),
      notes: {
        courseId: courseId,
        userId: userId,
      },
    };

    try {
      //initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);

      res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: "could not initiate order",
      });
    }
    //return response
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//razorpay webhook will hit this controller
const verifyPayment = async (req, res) => {
  try {
    const webHookSecret = "12345678";
    const received_signature = req.headers["x-razorpay-signature"]; //getting signature from razorpay in this key "x-razorpay-signature" in encrypted form
    const expected_signature = crypto
      .createHmac("sha256", webHookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (received_signature === expected_signature) {
      console.log("Payment is Authorised");
      const { courseId, userId } = req.body.payload.payment.entity.notes;
      try {
        //fullfill the action
        // find the course and enroll the student in it
        const enrolledCourse = await COURSE.findByIdAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );

        if (!enrolledCourse) {
          return res.status(500).json({
            success: false,
            message: "Course not Found",
          });
        }
        console.log(enrolledCourse);
        //find the student and add the course to their enrolled courses
        const enrolledStudent = await USER.findByIdAndUpdate(
          { _id: userId },
          { $push: { courses: courseId } },
          { new: true }
        );
        console.log(enrolledStudent);

        //Send confirmation mail to student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          "Congratulations",
          "Congratulations, you are onboarded into a new course"
        );
        console.log(emailResponse);

        return res.status(200).json({
          success: true,
          message: "signature verified and course enrolled",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
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

module.exports = { capturePayment, verifyPayment };
