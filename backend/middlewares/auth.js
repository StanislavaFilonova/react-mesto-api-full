const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/UnauthorizedError');

/* eslint-disable consistent-return */
// module.exports = (req, res, next) => {
//   // const token = req.cookies.jwt;
//   const { authorization } = req.headers;
//   const token = authorization.replace('Bearer ', '');
//
//   if (!token) {
//     throw new Unauthorized('Необходима авторизация');
//   }
//   let payload;
//   try {
//     // попытаемся верифицировать токен
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     // отправим ошибку, если не получилось
//     next(new Unauthorized('Необходимо авторизоваться'));
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//
//   next(); // пропускаем запрос дальше
// };*/
/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt || !jwt.startsWith('Bearer ')) {
    throw new Unauthorized('Необходимо авторизоваться');
  }
  const token = jwt.replace('Bearer ', '');

  let payload;
  try {
    payload = jwtToken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new Unauthorized('Необходимо авторизоваться'));
  }
};
