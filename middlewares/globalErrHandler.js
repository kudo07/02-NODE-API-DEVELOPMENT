export const globalErrHandler = (err, req, res, next) => {
  // stack
  // message
  //   when the routes hits and check the if it login correct or not then it pass the error to the middleware globalErrHandler and the
  // it call with the help of the package express-error-handler with the function called asyncHandler which wraps the user controller
  // function "loginUserController" and "registerUserController" and pass the info with the error in this globalErrHandler function
  const stack = err?.stack;
  const statusCode = err?.statusCode ? err?.statusCode : 500;
  const message = err?.message;
  res.status(statusCode).json({ stack, message });
};

export const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  next(err);
};
