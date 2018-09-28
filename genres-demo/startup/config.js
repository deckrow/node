const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) { //export vidly_jwtPrivateKey=**** в консоле
        throw new Error('Fatal error: jwpPrivateKey is not defined.');
    }
}