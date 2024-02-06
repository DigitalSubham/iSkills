// in signup time we have created dummy profile we have to update only

const PROFILE = require("../models/Profile");
const USER = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

const updateProfile = async (req, res) => {
  try {
    //data fetch
    const {
      gender,
      dateOfBirth = "",
      about = "",
      phoneNumber,
      profession,
      name,
    } = req.body;
    //get user id
    const userId = req.user.id;
    //validation
    if (!gender || !phoneNumber || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find profile from user model
    const userDetails = await USER.findById(userId);
    if (name) {
      userDetails.firstName = name.split(" ")[0];
      userDetails.lastName = name.split(" ").slice(1).join(" ");
      await userDetails.save();
    }

    const profileId = userDetails.additionalDetails;
    const profileDetails = await PROFILE.findById(profileId);
    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.phoneNumber = phoneNumber;
    profileDetails.profession = profession;
    await profileDetails.save(); //object pehle se create h bs update kar rahe h isliye save methed
    const updatedUserDetails = await USER.findById(userId)
      .populate("additionalDetails")
      .exec();
    //return res
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile, please try again",
    });
  }
};

//delete Account

const deleteAccount = async (req, res) => {
  try {
    //get id
    const userId = req.user.id;
    //validation
    const userDetails = await USER.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    //delete user profile
    const profileId = userDetails.additionalDetails;
    //Todo: add scheduling
    await PROFILE.findByIdAndDelete({ _id: profileId });
    //TOdo:  unenroll user from all enrolled courses(done on course model)

    //delete user
    //Todo: add scheduling
    await USER.findByIdAndDelete({ _id: userId });

    //return res
    return res.status(200).json({
      success: true,
      message: "user account delete successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting user account, please try again",
    });
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    //get id
    const userId = req.user.id;
    //validation and get user details
    const userDetails = await USER.findById(userId)
      .populate("additionalDetails")
      .exec();
    //retuen response
    console.log("userDetails", userDetails);
    return res.status(200).json({
      success: true,
      message: "user details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching user account, please try again",
    });
  }
};

const updateDisplayPicture = async (req, res) => {
  try {
    //fetch image
    const profilePic = req.files.displayPicture;
    console.log(profilePic);
    //fetch userId;
    const userId = req.user.id;
    console.log(userId);
    //validation
    if (!profilePic) {
      return res.status(401).json({
        success: false,
        message: "Please provide profile picture",
      });
    }
    //upload image to cloudinary
    const uploadImage = await uploadImageToCloudinary(
      profilePic,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log("uploadImageToCloudinary", uploadImage);
    //update user profile picture
    const updatedProfilePic = await USER.findByIdAndUpdate(
      { _id: userId },
      { image: uploadImage.secure_url },
      { new: true }
    );
    //return res
    return res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfilePic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Todo
const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await USER.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    // console.log(userDetails);
    userDetails = userDetails.toObject();
    // console.log(userDetails);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const instructorDashboard = async (req, res) => {
  try {
    //find the course created by specific instructor
    const courseDetails = await Course.find({ instructor: req.user.id });
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });
    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
};
