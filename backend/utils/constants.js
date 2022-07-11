// ---Проверка URL
const regex = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

// ---Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto1.n-kzn.students.nomoredomainssbs.ru',
  'http://mesto1.n-kzn.students.nomoredomainssbs.ru',
  'localhost:3000',
  'http://127.0.0.1:5500',
];

module.exports = { regex, allowedCors };
