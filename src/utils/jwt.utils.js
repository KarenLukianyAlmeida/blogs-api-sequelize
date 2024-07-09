const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createToken = (userData) => {
  const token = jwt.sign(userData, secret);

  return token;
};

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, secret);

  return decodedToken;
};

module.exports = {
  createToken,
  verifyToken,
};