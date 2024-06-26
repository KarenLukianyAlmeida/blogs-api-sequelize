const { PostCategoryService, BlogPostService } = require('../services');

const errorMessage = { message: 'Erro Interno!' };

const insertPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.locals.user;

    const dataPost = { title, content, categoryIds };
    const { status, data } = await BlogPostService.createPost(dataPost, id);

    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorMessage);
  }
};

const getPosts = async (_req, res) => {
  try {
    const posts = await PostCategoryService.getPosts();
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).jason(errorMessage);
  }
};

const getPost = async (req, res) => {
  try {
    const { status, data } = await PostCategoryService.getPost(req.params);

    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorMessage);
  }
};

// const updatePost = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const { id } = req.locals.user;
//     const { status, data } = await

//     return res.status(status).json(data);
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json(errorMessage);
//   }
// };

module.exports = {
  insertPost,
  getPosts,
  getPost,
  // updatePost,
};