const { BlogPost, PostCategory } = require('../models');
const CategoryService = require('./category.service');
const checkRequiredFields = require('../utils/checkRequiredFields');

const insertPostCategory = async (postId, categoryId) => {
  const newPostBlog = await PostCategory.create({ postId, categoryId });

  return newPostBlog.dataValues;
};

const createPost = async (dataPost, userId) => {
  const { title, content, categoryIds } = dataPost;

  const missingFields = checkRequiredFields(dataPost);
  if (missingFields) {
    return { status: missingFields.status, data: missingFields.data };
  }

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
  
  // ---- ADD DATA ON POSTS_CATEGORIES ---- //
  await categoryIds.map((categoryId) => insertPostCategory(post.dataValues.id, categoryId));

  return { status: 201, data: post.dataValues };
};

module.exports = {
  createPost,
};