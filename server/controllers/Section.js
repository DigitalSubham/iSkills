const SECTION = require("../models/Section");
const COURSE = require("../models/Course");

const createSection = async (req, res) => {
  try {
    //fetch data
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //create section
    const newSection = await SECTION.create({
      sectionName: sectionName,
    });
    //add this section id to course schema
    const updateCourseDetails = await COURSE.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    );
    // Todo: use populate to replace sections/sub-sections both in the updatedCourseDetails
    // return res
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updateCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating section, please try again",
    });
  }
};

const updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body;
    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // update data
    const updateSection = await SECTION.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );
    //   return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating section, please try again",
    });
  }
};

//delete section
const deleteSection = async (req, res) => {
  try {
    //data fetch(get id)
    const { sectionId } = req.body;
    // delete section using id from database
    const del = await SECTION.findByIdAndDelete(sectionId);
    //TODO : i think we have to update the courseContent in which we have deleted sectionId we have to pull out that from courseContent array
    //return res
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating section, please try again",
    });
  }
};

module.exports = { createSection, updateSection, deleteSection };
