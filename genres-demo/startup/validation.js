const Joi = require('joi'); 

module.exports = function () {
    Joi.objectId =  require('joi-objectid')(Joi); // проверка в регулярке на правильный id(1234 - без проверки не выдает ошибку при запросе)
}