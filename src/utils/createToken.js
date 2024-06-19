const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
  const token = jwt.sign({ data: { userId } }, secret);

  return token;
};

module.exports = {
  createToken,
};