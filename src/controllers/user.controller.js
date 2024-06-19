const { UserService } = require('../services');

const errorMessage = { message: 'Erro Interno!' };

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const { status, data } = await UserService.createUser({ displayName, email, password, image });

    return res.status(status).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json(errorMessage);
  }
};

module.exports = {
  createUser,
};