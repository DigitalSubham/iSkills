const USER = require("../models/User");
const OTP = require("../models/Otp");
const { otpGenerator } = require("../utils/helper");
const bcrypt = require("bcrypt");
const PROFILE = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
//sendOtp

const sendOtp = async (req, res) => {
  try {
    //fetch email from req.body
    const { email } = req.body;
    //check email exist in database or not
    const checkUserPresent = await USER.findOne({ email: email });

    // if email exist send a response
    if (checkUserPresent) {
      res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }
    //generate otp
    let otp = otpGenerator();
    console.log("otp", otp);
    //check otp exist in database
    let checkUniqueOtp = await OTP.findOne({ otp: otp });
    // if otp exist generate new otp and again check otp in database if exist generate again
    while (checkUniqueOtp) {
      otp = otpGenerator();
      checkUniqueOtp = await OTP.findOne({ otp: otp }); // Update checkUniqueOtp
    }

    const otpPayload = { email, otp };
    // add email and otp to database
    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody", otpBody);

    return res.status(200).json({
      success: true,
      message: "Otp send successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//signUp

const signUp = async (req, res) => {
  console.log("testing", req.body);
  try {
    //data fetch from req.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    //validata data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //match passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords are not matching, try again",
      });
    }
    //check user already exists or not
    const checkUserPresent = await USER.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered, Please sign up to continue.",
      });
    }

    //find most recent OTP stord for the user(email)
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recentOtp", recentOtp);
    //validate otp
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      //Invalid otp
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await PROFILE.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    //signup entry in db
    const user = await USER.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    //return res
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

//signIn

const signIn = async (req, res) => {
  try {
    //get data from req.body
    const { email, password } = req.body;
    //validata data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }

    //user exist or not in database
    const user = await USER.findOne({ email: email }).populate(
      "additionalDetails"
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signUp first",
      });
    }
    //after matching password (given by client in login time and password saved in database ) if true generate token
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "logged In successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

//changePassword

const changePassword = async (req, res) => {
  try {
    // Destructure data from req.body
    const { oldPassword, newPassword } = req.body;
    // console.log("check", oldPassword, newPassword, req.user.email);
    // Validation
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. Please check your data.",
      });
    }
    const userDetails = await USER.findById(req.user.id);
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }
    const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database and check oldPassword at the same time
    const updatedUser = await USER.findByIdAndUpdate(
      req.user.id,
      { password: encryptedNewPassword },
      { new: true }
    );
    // console.log("check2", updatedUser);
    // Check if the update was successful
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "failed to update the password in the database",
      });
    }

    // Send email => password is updated
    await mailSender(
      updatedUser.email,
      "Password Changed successfully",
      `Password Changed successfully`
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: "Password is changed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while changing the password, please try again",
    });
  }
};

module.exports = { sendOtp, signUp, signIn, changePassword };
