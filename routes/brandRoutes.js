import express from 'express';
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  updateBrandCtrl,
} from '../controllers/brandCntrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const brandRouter = express.Router();
brandRouter.post('/', isLoggedIn, createBrandCtrl);
brandRouter.get('/', getAllBrandsCtrl);
brandRouter.get('/:id', getSingleBrandCtrl);
brandRouter.delete('/:id', deleteBrandCtrl);
brandRouter.put('/:id', updateBrandCtrl);
export default brandRouter;
