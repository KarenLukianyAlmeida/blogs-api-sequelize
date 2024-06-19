const { UserService } = require('../services');

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserService.getUserByPassword(password);

  if (!user || user.email !== email) {
    res.status(400).json({ message: 'Invalid fields' });
  }

  req.user = user;

  return next();
};

module.exports = validateUser;