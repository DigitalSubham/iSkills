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
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();
    //validation
    if (!selectedCategoryCourses) {
      return res.status(404).json({
        success: false,
        message: "No Courses",
      });
    }

    // Handle the case when there are no courses
    if (selectedCategoryCourses.course.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await CATEGORY.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await CATEGORY.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    //console.log("Different COURSE", differentCategory)

    //get top selling courses
    const allCategories = await CATEGORY.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    // console.log("mostSellingCourses COURSE", mostSellingCourses)

    //return res
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
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
