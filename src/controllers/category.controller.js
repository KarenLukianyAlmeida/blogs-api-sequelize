const { CategoryService } = require('../services');

const errorMessage = { message: 'Erro Interno!' };

const addCategory = async (req, res) => {
  try {
    const nameData = req.body;
    console.log('NAME: ', nameData);
    const { status, data } = await CategoryService.addCategory(nameData);

    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorMessage);
  }
};

module.exports = {
  addCategory,
};