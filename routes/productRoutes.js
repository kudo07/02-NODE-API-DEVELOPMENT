import express from 'express';
import {
  createProductCtrl,
  getProductsCntrl,
} from '../controllers/productControllers.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const productRouter = express.Router();
productRouter.post('/', isLoggedIn, createProductCtrl);
productRouter.get('/', isLoggedIn, getProductsCntrl);
export default productRouter;
