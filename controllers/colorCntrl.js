import asyncHandler from 'express-async-handler';
import Color from '../model/Color.model.js';
// 1
// @desc    Create new Color
// @route   POST /api/v1/colors
// @access  Private/Admin
export const createColorCntrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //   color exist
  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error('color already exist');
  }
  //   create
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: 'success',
    message: 'color created successfully',
    color,
  });
});

// 2
// @desc    Get all colors
// @route   GET /api/colors
// @access  Public
export const getAllColorsCntrl = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json({
    status: 'success',
    message: 'colors fetched succesfully',
    colors,
  });
});

// 3
// @desc    Get single color
// @route   GET /api/colors/:id
// @access  Public
export const getSingleColorCntrl = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: 'success',
    message: 'color fetched successfully',
    color,
  });
});

// 3

// @desc    Update color
// @route   PUT /api/colors/:id
// @access  Private/Admin
export const updateColorCntrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //   update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json({ status: 'success', message: 'color updated successfully', color });
});

// 4
// @desc    delete color
// @route   DELETE /api/colors/:id
// @access  Private/Admin
export const deleteColorCntrl = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'color deleted successfully',
  });
});
