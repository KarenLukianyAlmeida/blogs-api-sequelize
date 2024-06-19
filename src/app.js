const express = require('express');

// ...
const validateBody = require('./middlewares/validayeBody');
const validateUser = require('./middlewares/validateUser');

const { LoginController } = require('./controllers');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.post('/login', validateBody, validateUser, LoginController.getToken);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
