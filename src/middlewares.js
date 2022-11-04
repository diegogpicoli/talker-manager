const loginValidation = async (req, res, next) => {
  const { body } = req;
  const reg = /\S+@\S+\.\S+/;
  const emailRegex = reg.test(body.email);
  console.log(body.email);
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

module.exports = {
  loginValidation,
};