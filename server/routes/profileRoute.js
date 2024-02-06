const express = require("express");
const router = express.Router();
const { checkForAuthentication, isInstructor } = require("../middlewares/auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", checkForAuthentication, deleteAccount);
router.put("/updateProfile", checkForAuthentication, updateProfile);
router.get("/getUserDetails", checkForAuthentication, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", checkForAuthentication, getEnrolledCourses);
router.put(
  "/updateDisplayPicture",
  checkForAuthentication,
  updateDisplayPicture
);
router.get(
  "/instructorDashboard",
  checkForAuthentication,
  isInstructor,
  instructorDashboard
);

module.exports = router;
