const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) { //проверка аутентификации
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));//декодирование по privatekey и получаем payload(наш объект)
        req.user = decoded;
        next();
    } catch(ex) {
        res.status(400).send('Invalid token.');
    }
}
