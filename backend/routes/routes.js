const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const cardsRoutes = require('./cards');
const usersRoutes = require('./users');
const auth = require('../middlewares/auth');
const { signupValidation, signinValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

router.use(auth);

router.use('/cards', cardsRoutes);
router.use('/users', usersRoutes);
router.post('/signout', logout);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

module.exports = router;
