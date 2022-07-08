const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');

const error = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-error');
const { createUser, login } = require('./controllers/users');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** обработка кросс-доменных запросов */
app.use(cors);

/** обработка логгер запросов */
app.use(requestLogger);

/** роутеры регистрации и аутентификации */
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

/** роутеры пользователей и карточек, защищены авторизацией */
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

/** обработка несуществующих роутов */
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

/** логгер ошибок */
app.use(errorLogger);

/** обработчик ошибок celebrate */
app.use(errors());

/** централизованный обработчик ошибок */
app.use(error);

/** подключение к mongo и серверу */
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Connect ${PORT}`);
  });
}

main();
