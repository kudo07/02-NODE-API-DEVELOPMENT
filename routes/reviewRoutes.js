import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createReviewCntrl } from '../controllers/reviewCntrl.js';
const reviewRouter = express.Router();
reviewRouter.post('/:productID', isLoggedIn, createReviewCntrl);
//
export default reviewRouter;
