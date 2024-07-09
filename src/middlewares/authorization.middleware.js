const jwtUtil = require('../utils/jwt.utils');

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = extractToken(authorization);
    const user = jwtUtil.verifyToken(token);
    req.locals = { user };
    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};