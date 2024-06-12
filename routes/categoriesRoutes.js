import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import {
  createCategoryCntrl,
  deleteCategoryCntrl,
  getAllCategoriesCtrl,
  getSingleCategoryCntrl,
  updateCategoryCntrl,
} from '../controllers/categoriesCntrl.js';
//
const categoryRouter = express.Router();
//
categoryRouter.post('/', isLoggedIn, createCategoryCntrl);
//
categoryRouter.get('/', getAllCategoriesCtrl);
categoryRouter.get('/:id', getSingleCategoryCntrl);
categoryRouter.delete('/:id', deleteCategoryCntrl);
categoryRouter.put('/:id', updateCategoryCntrl);
//
export default categoryRouter;
