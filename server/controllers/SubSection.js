const SUBSECTION = require("../models/SubSection");
const SECTION = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create subsection

const createSubSection = async (req, res) => {
  try {
    //data fetch
    const { title, timeDuration, description, sectionId } = req.body;
    //fetch file(video)
    const videoFile = req.files.videoFile;
    //validation
    if (!sectionId || !title || !timeDuration || !description || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //upload video to cloudinary
    const subSectionVideo = await uploadImageToCloudinary(
      videoFile,
      process.env.FOLDER_NAME
    );
    //add data to subsection model
    const newSubSection = await SUBSECTION.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: subSectionVideo.secure_url,
    });
    // update section model with this sub section object id
    const updateSection = await SECTION.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    ).populate("subSection");
    //Todo: log updated section here, after adding populate query
    //return response
    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      updateSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating subsection, please try again",
    });
  }
};

// update subsection
const updateSubSection = async (req, res) => {
  try {
    //data fetch
    const { title, timeDuration, description, subSectionId } = req.body;
    //fetch video file
    const videoFile = req.files.video;
    // validation
    if (!title || !timeDuration || !description || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Todo : as we updating video in cloudinary it is good to delete previous uploaded video
    // video upload to clodinary
    const subSectionVideo = await uploadImageToCloudinary(
      videoFile,
      process.env.FOLDER_NAME
    );
    // update data in database
    const updateSection = await SUBSECTION.findByIdAndUpdate(
      subSectionId,
      {
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: subSectionVideo.secure_url,
      },
      { new: true }
    );

    //return res
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating subsection, please try again",
    });
  }
};
// delete subsection
const deleteSubSection = async (req, res) => {
  try {
    //data fetch(get id)
    const subSectionId = req.body;
    // delete subSection using id from database
    const del = await SUBSECTION.findByIdAndDelete(subSectionId);
    //TODO : i think we have to update the section model (subSection array)  in which we have deleted subsectionId we have to pull out that from subSection array

    // return res
    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting subsection, please try again",
    });
  }
};

module.exports = { createSubSection, updateSubSection, deleteSubSection };
