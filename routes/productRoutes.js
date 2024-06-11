import express from 'express';
import {
  createProductCtrl,
  deleteProductCntrl,
  getProductCntrl,
  getProductsCntrl,
  updateProductCntrl,
} from '../controllers/productControllers.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const productRouter = express.Router();
productRouter.post('/', isLoggedIn, createProductCtrl);
productRouter.get('/', getProductsCntrl);
productRouter.get('/:id', getProductCntrl);
productRouter.put('/:id', isLoggedIn, updateProductCntrl);
productRouter.delete('/:id/delete', isLoggedIn, deleteProductCntrl);
export default productRouter;
