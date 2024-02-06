const USER = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//Reset Password token (send link to email)
const resetPasswordToken = async (req, res) => {
  try {
    //get email from req.body
    const { email } = req.body;
    //check user for this , email validation
    const user = await USER.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your Email is not Registered with us",
      });
    }
    //generate token
    const token = crypto.randomUUID();
    //update user by adding token and expiration time
    const updatedDetails = await USER.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);
    //create url
    const url = `http:localhost:3000/reset-password/${token}`;
    //send mail containing the url
    await mailSender(
      email,
      "Password Reset Link",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );
    //return res
    return res.status(200).json({
      success: true,
      message: "Password link sent successfully to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something Went wrong while reset password",
    });
  }
};

// Reset Password (in db)

const resetPasswordinDb = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body;
    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords are not matching, try again",
      });
    }
    //get user details from db using token
    const userDetails = await USER.findOne({ token: token });
    // if no entry - invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }
    // token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is expired, please regenerate token",
      });
    }
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    //password update to database
    await USER.findOneAndUpdate(
      { token: token },
      { password: hashPassword },
      { new: true }
    );
    //return response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something Went wrong while update password in database",
    });
  }
};

module.exports = { resetPasswordToken, resetPasswordinDb };
