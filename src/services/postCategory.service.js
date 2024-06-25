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

const getPostById = async (id) => {
  const postExists = await BlogPost.findOne({ where: { id } });
  if (!postExists) return { status: 404, data: { message: 'Post does not exist' } };

  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    {
      model: Category, as: 'categories', attributes: ['id', 'name'], through: { attributes: [] } }],
  });

  const formatedPost = post.dataValues;

  return { status: 200, data: formatedPost };
};

const getPostByTitle = async (title, content, userId) => {
  const postExists = await BlogPost.findOne({ where: { title } }).dataValues;
  if (!postExists) return { status: 404, data: { message: 'Post does not exist' } };

  if (postExists.userId !== userId) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }

  const formatedPost = await getPostById(postExists.id);
  return formatedPost;
};

// const updatePost = async (title, content, userId) => {

// };

module.exports = { insertPostCategory, getPosts, getPostById, getPostByTitle };