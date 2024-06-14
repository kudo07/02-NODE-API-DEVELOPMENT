import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import {
  createColorCntrl,
  deleteColorCntrl,
  getAllColorsCntrl,
  getSingleColorCntrl,
  updateColorCntrl,
} from '../controllers/colorCntrl.js';

const colorRouter = express.Router();
colorRouter.post('/', isLoggedIn, createColorCntrl);
colorRouter.get('/', getAllColorsCntrl);
colorRouter.get('/:id', getSingleColorCntrl);
colorRouter.delete('/:id', isLoggedIn, deleteColorCntrl);
colorRouter.put('/:id', isLoggedIn, updateColorCntrl);
export default colorRouter;
