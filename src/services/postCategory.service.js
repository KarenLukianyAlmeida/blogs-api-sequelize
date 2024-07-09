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

const updatePost = async (id, userId, postData) => {
  const temporario = await getPost(id);
  console.log('userId: ', userId);
  const post = temporario.data;
  console.log('post: ', post);
  if (post.userId !== userId) return { status: 401, data: { message: 'Unauthorized user' } };
  console.log('postdata:', postData);
  const keys = Object.keys(postData);
  console.log('keys:', keys);
  if (!(keys.includes('title', 'content'))) {
    return { status: 400, data: { message: '1 - Only title and content can be updated' } };
  }
  if (!keys.length === 0) {
    return { status: 400, data: { message: '2 - Only title and content can be updated' } };
  }

  await BlogPost.update(postData, { where: { id } });

  const updatedPost = (await getPost(id)).data;

  return { status: 200, data: updatedPost };
};

module.exports = { insertPostCategory, getPosts, getPost, updatePost };