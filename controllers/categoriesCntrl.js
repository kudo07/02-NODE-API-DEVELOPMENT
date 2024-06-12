import asyncHandler from 'express-async-handler';
import Category from '../model/Category.model.js';
// 1
// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategoryCntrl = asyncHandler(async (req, res) => {
  // async handler takes the error to the middlewares which express the error in the testing phase

  const { name } = req.body;

  //   category exist
  const categoryFound = await Category.findOne({ name: name.toLowerCase() });

  if (categoryFound) {
    throw new Error('Category already exists');
  }
  //   exist
  const category = await Category.create({
    name: name?.toLowerCase(),
    user: req.userAuthId,
    image: req?.file?.path,
  });
  res.json({
    status: 'success',
    message: 'Category created successfully',
    category,
  });
});

// 2
// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: 'success',
    message: 'Categories fetched successfully',
    categories,
  });
});
// 3
// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getSingleCategoryCntrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    status: 'success',
    message: 'Category fetched successfully',
    category,
  });
});

// 4
// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategoryCntrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json({
    status: 'success',
    message: 'Category updated successfully',
    category,
  });
});

// 5
// @desc    delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategoryCntrl = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'Category deleted successfully',
  });
});
