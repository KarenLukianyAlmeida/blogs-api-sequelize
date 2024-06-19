const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const errorMessage = { message: 'Erro Interno!' };

const { UserService } = require('../services');

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

const getToken = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateBody(req.body, res)) return;

    const user = await UserService.getUserByPassword(email);

    if (!validateUserOrPassword(user, password, res)) return;

    const token = jwt.sign({ data: { userId: user.id } }, secret);

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json(errorMessage);
  }
};

module.exports = {
  getToken,
};