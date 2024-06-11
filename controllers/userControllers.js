import User from '../model/User.model.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';
// 1- REGISTER USER
// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin
export const registerUserCntrl = asyncHandler(async (req, res) => {
  //  destructure the payload
  const { fullname, email, password } = req.body;
  //   check the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    // throw
    throw new Error('User already exists');
  }
  //   hash passowrd
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //
  // create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: 'success',
    message: 'User Registered Successfully',
    data: user,
  });
  //   to payload in the server
});
// 2 LOGIN USER
// ! desc LOGIN USER
// @route POST /api/v1/users/login
// @access Public

export const loginUserCntrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //   find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: 'success',
      message: 'User logged in Successfully',
      userFound,
      token: generateToken(userFound?._id),
      // generate the token for this particular id here
      // starts poin to generate the token
    });
  } else {
    throw new Error('Invalid login credentials');
  }
});
// XYF3Arq6QJHaxCt-p a s;

// 3 PROFILE ROUTES
// @desc GET USER PROFILE
//  @ ROUTE  GET api/v1/users/profile
// @access Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  // const user =await User.findById(req.user)
  const token = getTokenFromHeader(req);
  console.log(token);
  const verifiedToken = verifyToken(token);
  console.log(verifiedToken);
  // pass the req object
  console.log(req);
  res.json({
    status: 'success',
    message: 'User profile fetched successfully',
  });
});
