const winston = require('winston'); //тут 3.0, на видосе 2.1 (записывает ошибки в logfile.log)\
require('winston-mongodb');// версия 3.0 
require('express-async-errors'); // проверка в try cathe (как middleware/async.js)

module.exports = function () {
    //неспойманые ошибки (пример)
    process.on("uncaughtException", (ex) => { // при ошибке все равно будет записывать в log file (throw new Error не сработает)
        console.log('We got an ancaght excaption');
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.handleException(
        new winston.transports.Console({ colorize: true, prettyPrint: true}), //красивый вывод в консоль
        new winston.transports.File({ filename: 'uncaughtException.log'})
        ); //не работает с rejection

    //пример
    process.on("unhandledRejection", (ex) => { // rejection не запишется в лог
        console.log('We got an unhandled rejection');
        winston.error(ex.message, ex);
        process.exit(1); // 0 success
    });

    winston.add(winston.transports.File, {  filename: 'logfile,log' });
    winston.add(winston.transports.MongoDB, {  
        db: 'mongodb://localhost/some_db',
        level: 'info' //будет только err, info, warn записываться в файл 
    }); // все ошибки в бд mongodb log
}