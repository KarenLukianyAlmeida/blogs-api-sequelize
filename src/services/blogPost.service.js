const { BlogPost } = require('../models');
const CategoryService = require('./category.service');
const { insertPostCategory } = require('./postCategory.service');

const createPost = async (dataPost, userId) => {
  const { title, content, categoryIds } = dataPost;
  console.log('CATEGORYIDS: ', categoryIds);
  // map to verify if all categories exists //
  const verifyCategory = await Promise.all(await categoryIds.map(async (category) => {
    const exist = await CategoryService.getCategoryById(category);
    if (!exist) {
      return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
    }
    return category;
  }));

  const errorCategory = verifyCategory.find((item) => typeof item === 'object');
  if (errorCategory) return errorCategory;

  // ---- ADD DATA ON POSTS_CATEGORIES ---- //
  const post = await BlogPost.create({ title, content, userId });
  console.log('POST: ', post);
  // ---- ADD DATA ON POSTS_CATEGORIES ---- //
  await categoryIds.map((categoryId) => insertPostCategory(post.dataValues.id, categoryId));

  return { status: 201, data: post.dataValues };
};

module.exports = { createPost };