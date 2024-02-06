// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  //   getFullCourseDetails,
  //   editCourse,
  //   getInstructorCourses,
  //   deleteCourse,
} = require("../controllers/Course");

// Categories Controllers Import
const {
  showAllCategory,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

// Rating Controllers Import
const {
  createRatingAndReview,
  getAverageRatingAndReview,
  getAllRatingAndReview,
} = require("../controllers/RatingAndReview");

// const { updateCourseProgress } = require("../controllers/courseProgress");

// Importing Middlewares
const {
  checkForAuthentication,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post(
  "/createCourse",
  checkForAuthentication,
  isInstructor,
  createCourse
);
//Add a Section to a Course
router.post("/addSection", checkForAuthentication, isInstructor, createSection);
// Update a Section
router.post(
  "/updateSection",
  checkForAuthentication,
  isInstructor,
  updateSection
);
// Delete a Section
router.post(
  "/deleteSection",
  checkForAuthentication,
  isInstructor,
  deleteSection
);
// Edit Sub Section
router.post(
  "/updateSubSection",
  checkForAuthentication,
  isInstructor,
  updateSubSection
);
// Delete Sub Section
router.post(
  "/deleteSubSection",
  checkForAuthentication,
  isInstructor,
  deleteSubSection
);
// Add a Sub Section to a Section
router.post(
  "/addSubSection",
  checkForAuthentication,
  isInstructor,
  createSubSection
);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
// router.post(
//   "/getFullCourseDetails",
//   checkForAuthentication,
//   getFullCourseDetails
// );

// Edit Course routes
// router.post("/editCourse", checkForAuthentication, isInstructor, editCourse);

// Get all Courses Under a Specific Instructor
// router.get(
//   "/getInstructorCourses",
//   checkForAuthentication,
//   isInstructor,
//   getInstructorCourses
// );

// Delete a Course
// router.delete("/deleteCourse", deleteCourse);

// router.post(
//   "/updateCourseProgress",
//   checkForAuthentication,
//   isStudent,
//   updateCourseProgress
// );

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", checkForAuthentication, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post(
  "/createRating",
  checkForAuthentication,
  isStudent,
  createRatingAndReview
);
router.get("/getAverageRating", getAverageRatingAndReview);
router.get("/getReviews", getAllRatingAndReview);

module.exports = router;
