const express = require('express');
const bodyParser = require('body-parser');
const { readTalker, readTalkerId, generateToken } = require('./data');
const { loginValidation } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const json = await readTalker();
  response.status(HTTP_OK_STATUS).json(json);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const json = await readTalkerId(id);
  if (json) {
    response.status(HTTP_OK_STATUS).json(json);
  } else {
    response.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', loginValidation, async (_req, res) => {
  const token = generateToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
