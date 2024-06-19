const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const errorMessage = { message: 'Erro Interno!' };

const getToken = async (req, res) => {
  try {
    const { id } = req.user;
    const token = jwt.sign({ data: { userId: id } }, secret);

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json(errorMessage);
  }
};

module.exports = {
  getToken,
};