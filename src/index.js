const express = require('express');
const bodyParser = require('body-parser');
const { readTalker, 
  readTalkerId, 
  generateToken, addTalker, putTalker, deleteTalker, searchTalker } = require('./data');
const { 
  loginValidation, 
  tokenValidation, 
  nameValidation, 
  ageValidation,
  talkValidation,
  rateValidation,
 } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const retorno = await searchTalker(q);
  res.status(200).json(retorno);
});

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

app.use(tokenValidation);

app.post('/talker', 
nameValidation, 
ageValidation,
talkValidation,
rateValidation, async (req, res) => {
  const { body } = req;
  const retorno = await addTalker(body);
  res.status(201).json(retorno);
});

app.put('/talker/:id',  
nameValidation, 
ageValidation,
talkValidation,
rateValidation, async (req, res) => {
  const { params: { id } } = req;
  const { body } = req;
  const retorno = await putTalker(id, body);
  res.status(200).json(retorno);
});

app.delete('/talker/:id', async (req, res) => {
  const { params: { id } } = req;
  deleteTalker(id);
  res.status(204).json();
});

app.listen(PORT, () => {
  console.log('Online');
});
