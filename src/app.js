const express = require('express');
// ...
const { LoginController, UserController } = require('./controllers');
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

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
