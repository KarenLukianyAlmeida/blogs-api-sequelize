const errorMessage = { message: 'Erro Interno!' };

const { UserService } = require('../services');

const { createToken } = require('../utils/jwt.utils');

const validateBody = (body, res) => {
  const { email, password } = body;

  if (!email || !password) {
    res
      .status(400)
      .json({ message: 'Some required fields are missing' });
    return false;
  }

  return true;
};

const validateUserOrPassword = (user, password, res) => {
  if (!user || user.password !== password) {
    res
      .status(400)
      .json({ message: 'Invalid fields' });
    return false;
  }

  return true;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateBody(req.body, res)) return;

    const user = await UserService.getUserByEmail(email);
    if (!validateUserOrPassword(user, password, res)) return;
    
    const token = createToken({ displayName: user.dataValues.displayName,
      email: user.dataValues.email });

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json(errorMessage);
  }
};

module.exports = {
  login,
};