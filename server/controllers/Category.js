const CATEGORY = require("../models/Category");
const COURSE = require("../models/Course");

//create Category handler function

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const categoryDetails = await CATEGORY.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAll Category handler function

const showAllCategory = async (req, res) => {
  try {
    const allCategory = await CATEGORY.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      message: "All category returned successfully",
      allCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//categoryPageDetails

const categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const categoryId = req.body;
    //get courses according to categoryId
    const selectedCategoryCourses = await CATEGORY.findById(categoryId)
      .populate("course")
      .exec();
    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "No Courses",
      });
    }
    //get courses from different category
    const differentCategoryCourses = await CATEGORY.find({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    //Todo:get top selling courses
    const topSellingCourses = await COURSE.aggregate([
      {
        $project: {
          courseName: 1,
          studentsEnrolledCount: { $size: "$studentsEnrolled" },
        },
      },
      {
        $sort: {
          studentsEnrolledCount: -1,
        },
      },
    ]);

    console.log(topSellingCourses);

    //return res
    return res.status(200).json({
      success: true,
      data: {
        selectedCategoryCourses,
        differentCategoryCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createCategory, showAllCategory, categoryPageDetails };
