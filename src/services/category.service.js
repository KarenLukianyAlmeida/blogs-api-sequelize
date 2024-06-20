const { Category } = require('../models');

const addCategory = async (nameData) => {
  if (!('name' in nameData)) {
    return { status: 400, data: { message: '"name" is required' } };
  }

  const newCategory = await Category.create(nameData);

  return { status: 201, data: newCategory.dataValues };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  const formatedCategories = categories.map((category) => category.dataValues);

  return { status: 200, data: formatedCategories };
};

module.exports = {
  addCategory,
  getCategories,
};