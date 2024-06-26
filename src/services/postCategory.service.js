const { BlogPost, PostCategory, User, Category } = require('../models');

const insertPostCategory = async (postId, categoryId) => {
  const newPostBlog = await PostCategory.create({ postId, categoryId }).dataValues;

  return newPostBlog;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    {
      model: Category, as: 'categories', attributes: ['id', 'name'], through: { attributes: [] } }],
  });

  const formatedPosts = posts.map((post) => post.dataValues);

  return formatedPosts;
};

const getPost = async (postInfo) => {
  const post = await BlogPost.findOne({
    where: postInfo,
    include: [{
      model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    {
      model: Category, as: 'categories', attributes: ['id', 'name'], through: { attributes: [] } }],
  });
  if (!post) return { status: 404, data: { message: 'Post does not exist' } };
  
  return { status: 200, data: post.dataValues };
};

module.exports = { insertPostCategory, getPosts, getPost };