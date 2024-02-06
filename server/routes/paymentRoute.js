// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  //   sendPaymentSuccessEmail,
} = require("../controllers/Payment");
const {
  checkForAuthentication,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");
router.post(
  "/capturePayment",
  checkForAuthentication,
  isStudent,
  capturePayment
);
router.post("/verifyPayment", checkForAuthentication, isStudent, verifyPayment);
// router.post(
//   "/sendPaymentSuccessEmail",
//   auth,
//   isStudent,
//   sendPaymentSuccessEmail
// );

module.exports = router;
