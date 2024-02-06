const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER = require("../models/User");

//auth

const checkForAuthentication = async (req, res, next) => {
  // console.log(req.header("Authorization").replace("Bearer ", ""));
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    // console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.user = decode;
    } catch (error) {
      //verification issue in jwt
      return res
        .status(401)
        .json({ success: false, message: "Token is Invalid" });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
    });
  }
};

//isStudent

const isStudent = async (req, res) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user Role is not matching",
    });
  }
};

//isInstructor

const isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user Role is not matching",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user Role is not matching",
    });
  }
};

module.exports = { checkForAuthentication, isStudent, isInstructor, isAdmin };
