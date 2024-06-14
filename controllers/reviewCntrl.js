import asyncHandler from 'express-async-handler';
import Product from '../model/Product.model.js';
import Review from '../model/Review.model.js';
// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Private/Admin
export const createReviewCntrl = asyncHandler(async (req, res) => {
  const { product, message, rating } = req.body;
  //   1 find the product
  const { productID } = req.params;
  console.log(productID);
  //   we got the product id for the reviews
  const productFound = await Product.findById(productID).populate('reviews');
  console.log(productFound);
  if (!productFound) {
    throw new Error('product Not found');
  }
  // check if user already reviewed this product
  const hasReviewed = productFound?.reviews?.find((review) => {
    console.log(review);
    return review?.user?.toString() === req?.userAuthId?.toString();
  });
  if (hasReviewed) {
    throw new Error('You have revied this product product');
  }
  // create the review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });
  // push review into product found
  productFound.reviews.push(review?.id);
  // resave
  await productFound.save();
  res
    .status(201)
    .json({ success: true, message: 'created reaview successfully' });
});
