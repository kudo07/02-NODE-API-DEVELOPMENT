import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

export const isLoggedIn = (req, res, next) => {
  //1  get the token from header
  const token = getTokenFromHeader(req);
  //  2 ff verify the token
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new Error('Invalid/ Expired token, please login again');
  } else {
    // save the user into req obj
    req.userAuthId = decodedUser?.id;
    next();
  }
};
