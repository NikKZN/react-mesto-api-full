require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser, logout } = require('./controllers/users');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/errHandler');
const { signupValidation, signinValidation } = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors);

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use(auth);

app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);
app.post('/signout', logout);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

app.use(errorLogger);

app.use(errors());

app.use(errHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Порт № ${PORT}`);
});
