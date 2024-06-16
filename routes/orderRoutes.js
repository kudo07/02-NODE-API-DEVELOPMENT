import express from 'express';
import { createOrderCntrl } from '../controllers/orderCntrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const orderRouter = express.Router();
orderRouter.post('/', isLoggedIn, createOrderCntrl);
export default orderRouter;
