const RATINGANDREVIEWS = require("../models/RatingAndReview");
const COURSE = require("../models/Course");
const { default: mongoose } = require("mongoose");

//create RatingAndReview

const createRatingAndReview = async (req, res) => {
  try {
    //get userId
    const { userId } = req.user.id;
    //get courseId and fetch other data from req.body
    const { rating, review, courseId } = req.body;
    //check if user is enrolled in course or not
    const courseDetails = await COURSE.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Student is not enrolled in the course`,
      });
    }
    //check if user already reviewed the course
    const alreadyRatingAndReview = await RATINGANDREVIEWS.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyRatingAndReview) {
      return res.status(400).json({
        success: false,
        message: `Course is already ratedandreviewed by user`,
      });
    }
    //create rating and review
    const addRatingReview = await RATINGANDREVIEWS.create({
      rating: rating,
      review: review,
      user: userId,
      course: courseId,
    });
    //update RatingAndReview to the course
    const updateCourse = await COURSE.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { ratingAndReviews: addRatingReview._id },
      },
      { new: true }
    );
    console.log(updateCourse);
    //return res
    return res.status(200).json({
      success: true,
      message: `Rating and Review created successfully`,
      addRatingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Something went wrong while creating Rating and Review`,
    });
  }
};

//create getAverageRatingAndReview
const getAverageRatingAndReview = async (req, res) => {
  try {
    //get CourseId
    const courseId = req.body.courseId;
    //calculate avgerage rating
    const result = await RATINGANDREVIEWS.aggregate([
      //result is an array result = [{averageRating: "4"}]
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId), //convert courseId (string to object)
        },
      },
      {
        $group: {
          _id: null, //single group
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating in db
    return res.status(200).json({
      success: true,
      message: `Average Rating is 0, no ratings given till now`,
      averageRating: 0,
    });

    //return rating
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Something went wrong while calculating average rating`,
    });
  }
};
//create getAllRatingAndReview

const getAllRatingAndReview = async (req, res) => {
  try {
    const allRatingAndReview = await RATINGANDREVIEWS.find({})
      .sort({ rating: "desc" })
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();
    return res.status(200).json({
      success: true,
      message: `All reviews fetched successfully`,
      data: allRatingAndReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Something went wrong while getting allRatingAndReview`,
    });
  }
};

//create getAllRatingAndReview on basis of course

module.exports = {
  createRatingAndReview,
  getAverageRatingAndReview,
  getAllRatingAndReview,
};
