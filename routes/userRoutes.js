import express from 'express';
import {
  getUserProfileCtrl,
  loginUserCntrl,
  registerUserCntrl,
  updateShippingAddresCtrl,
} from '../controllers/userControllers.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const userRoutes = express.Router();
userRoutes.post('/register', registerUserCntrl);
userRoutes.post('/login', loginUserCntrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);
userRoutes.put('/update/shipping', isLoggedIn, updateShippingAddresCtrl);
export default userRoutes;
