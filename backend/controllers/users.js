const bcrypt = require('bcryptjs');
const User = require('../models/user');
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { generateToken } = require('../helpers/jwt');

const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

/** добавить пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  return bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => (
      User
        .create({
          email,
          password: hash,
          name,
          about,
          avatar,
        })
    ))
    .then((user) => {
      res
        .status(201)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с указанным email уже существует'));
      } else {
        next(err);
      }
    });
};

/** получить всех пользователей */
module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => {
      res
        .status(200)
        .send(users);
    })
    .catch(next);
};

/** получить информацию о пользователе */
module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Введен некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

/** получить пользователя по ID */
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Введен некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

/** обновить данные пользователя */
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      const err = new Error('Пользователь по указанному id не найден');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

/** обновить аватар пользователя */
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User
    .findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      const err = new Error('Пользователь по указанному id не найден');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

/** аутентификация - вход по email и паролю  */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new UnauthorizedError('Не передан email или пароль'));
  }
  return User
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        const err = new UnauthorizedError('Некорректная почта или пароль');
        err.statusCode = 'UnauthorizedError';
        throw err;
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        const err = new UnauthorizedError('Некорректная почта или пароль');
        err.statusCode = 'UnauthorizedError';
        throw err;
      }
      return generateToken({ email: user.email });
    })
    .then((token) => {
      res
        .status(200).send({ token });
    })
    .catch((err) => {
      if (err.statusCode === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      } else if (err.statusCode === 'UnauthorizedError') {
        next(new UnauthorizedError('Некорректная почта или пароль'));
      } else {
        next(err);
      }
    });
};
