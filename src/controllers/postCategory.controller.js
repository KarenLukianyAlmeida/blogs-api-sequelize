const { PostCategoryService } = require('../services');

const errorMessage = { message: 'Erro Interno!' };

const insertPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.locals.user;

    const dataPost = { title, content, categoryIds };
    const { status, data } = await PostCategoryService.createPost(dataPost, id);

    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorMessage);
  }
};

module.exports = {
  insertPost,
};