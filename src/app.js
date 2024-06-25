const express = require('express');
// ...
const {
  LoginController,
  UserController,
  CategoryController,
  PostCategoryController,
} = require('./controllers');
const authorizationMiddleware = require('./middlewares/authorization.middleware');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.use(express.json());

// ...

app.post('/login', LoginController.login);
app.post('/user', UserController.createUser);
app.get('/user', authorizationMiddleware, UserController.getUsers);
app.get('/user/:id', authorizationMiddleware, UserController.getUserById);
app.post('/categories', authorizationMiddleware, CategoryController.addCategory);
app.get('/categories', authorizationMiddleware, CategoryController.getCategories);
app.post('/post', authorizationMiddleware, PostCategoryController.insertPost);
app.get('/post', authorizationMiddleware, PostCategoryController.getPosts);
app.get('/post/:id', authorizationMiddleware, PostCategoryController.getPostById);
// app.put('/post/:id', authorizationMiddleware, );

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
