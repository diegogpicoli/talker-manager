const loginValidation = async (req, res, next) => {
  const { body } = req;
  const reg = /\S+@\S+\.\S+/;
  const emailRegex = reg.test(body.email);
  if (!body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (body.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const tokenValidation = async (req, res, next) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidation = async (req, res, next) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
    if (body.name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = async (req, res, next) => {
  const { body } = req;

  if (!body.age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
    if (body.age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = async (req, res, next) => {
  const { body } = req;
  const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!body.talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!body.talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dataRegex.test(body.talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = async (req, res, next) => {
  const { body } = req;
  console.log(Number(body.talk.rate) % 1 === 0);
  if (body.talk.rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!body.talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (body.talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (Number(body.talk.rate) % 1 !== 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  loginValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
};