const COURSE = require("../models/Course");
const CATEGORY = require("../models/Category");
const USER = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//createCourse handler function
const createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;
    //data fetch
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
    //file fetch  get thumbnail
    const thumbnail = req.files.thumbnailImage;

    // Convert the tag and instructions from stringified Array to Array
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    console.log("tag", tag);
    console.log("instructions", instructions);

    //validation (instructor level validation, category level validation)

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !tag.length ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    //   check if the user is instructor and it exist in db or not
    const instructorDetails = await USER.findById(userId, {
      accountType: "Instructor",
    });
    console.log("instructor details", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // check given category exist in db or not
    const categoryDetails = await CATEGORY.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found",
      });
    }

    //file (image) upload to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create entry of new course
    const newCourse = await COURSE.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    });

    //add the new course to the USER Schema of Instructor
    await USER.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $pull: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update the category Schema
    await CATEGORY.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $pull: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //return res
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to create course",
      error: error.message,
    });
  }
};

//get all course
const getAllCourses = async (req, res) => {
  try {
    const allCourses = await COURSE.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to show all course",
      error: error.message,
    });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    //get course id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await COURSE.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Course Details fetched successfully`,
      courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Something went wrong while fetching Course`,
    });
  }
};

module.exports = { createCourse, getAllCourses, getCourseDetails };
