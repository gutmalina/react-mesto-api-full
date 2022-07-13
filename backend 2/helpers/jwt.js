const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET_KEY = 'some-secret-key';

/** создать токен */
const generateToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' },
);

module.exports = { generateToken};