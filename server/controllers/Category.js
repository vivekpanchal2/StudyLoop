const Category = require("../models/categoryModel");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const categoryDetails = await Category.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All Categories Fetched Successfully",
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "instructor" }, { path: "ratingAndReview" }],
      })
      .exec();

    if (!selectedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "instructor" }, { path: "ratingAndReview" }],
      })
      .exec();

    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: [{ path: "instructor" }, { path: "ratingAndReview" }],
    });

    const allCourses = allCategories.flatMap((category) => category.courses);

    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      selectedCategory,
      differentCategory,
      mostSellingCourses,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting Category");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting Category",
      error: error.message,
    });
  }
};
