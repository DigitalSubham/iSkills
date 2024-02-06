// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
  signIn,
  signUp,
  sendOtp,
  changePassword,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPasswordinDb,
} = require("../controllers/ResetPassword");

const { checkForAuthentication } = require("../middlewares/auth");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", signIn);

// Route for user signup
router.post("/signup", signUp);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp);

// Route for Changing the password
router.post("/changepassword", checkForAuthentication, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification in db
router.post("/reset-password", resetPasswordinDb);

// Export the router for use in the main application
module.exports = router;
