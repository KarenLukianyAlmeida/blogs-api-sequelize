const errorMessage = { message: 'Erro Interno!' };

const { UserService } = require('../services');
const checkRequiredFields = require('../utils/checkRequiredFields');

const { createToken } = require('../utils/jwt.utils');

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

    const missingFields = checkRequiredFields(req.body);
    if (missingFields) {
      return res.status(missingFields.status).json(missingFields.data);
    }

    const user = await UserService.getUserByEmail(email);
    if (!validateUserOrPassword(user, password, res)) return;
    
    const token = createToken({ id: user.dataValues.id,
      displayName: user.dataValues.displayName,
      email: user.dataValues.email,
      image: user.dataValues.image });

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json(errorMessage);
  }
};

module.exports = {
  login,
};