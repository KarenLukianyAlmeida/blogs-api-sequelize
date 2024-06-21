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

const getCategoryById = async (id) => {
  const category = await Category.findOne({ 
    where: { id },
  });
  if (!category) return false;
  
  return category.dataValues;
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
};