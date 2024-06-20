const { Category } = require('../models');

const addCategory = async (nameData) => {
  if (!('name' in nameData)) {
    return { status: 400, data: { message: '"name" is required' } };
  }

  const newCategory = await Category.create(nameData);

  return { status: 201, data: newCategory.dataValues };
};

module.exports = {
  addCategory,
};