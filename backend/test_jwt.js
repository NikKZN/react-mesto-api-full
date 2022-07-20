const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQxNzVkZWEwYjk1ODI0NWE0NDFiNjAiLCJpYXQiOjE2NTgyNDgwMjMsImV4cCI6MTY1ODg1MjgyM30.dPoKBrHnAr_WNoZ5d3Vc7rreV5AlCMeFeuKPL8nsf3I'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'dev-secret'; // вставьте сюда секретный ключ для разработки из кода студента
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', 'Надо исправить. В продакшне используется тот же секретный ключ, что и в режиме разработки.');
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log('\x1b[32m%s\x1b[0m', 'Всё в порядке. Секретные ключи отличаются');
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
  }
}
