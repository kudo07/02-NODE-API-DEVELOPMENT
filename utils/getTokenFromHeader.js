export const getTokenFromHeader = (req) => {
  // pass the entire request object
  //   get token from the header
  // we pass in the header authorisation token which we get from the loinUserContrl function
  const token = req?.headers?.authorization?.split(' ')[1];
  // console.log(headerObj);
  // console.log(req.headers);
  if (token === undefined) {
    return 'No token found in the header';
  } else {
    return token;
  }
};
