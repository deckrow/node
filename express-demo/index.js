const logger = require('./middleware/logger');         // middleware function (промежуточная ф-ция)
const courses = require('./routes/courses');    // вынос отдельных подпунктов через роутер в папку
const home = require('./routes/home');
const express = require('express');         // расширение для удобной работы с http запросами
const helmet = require('helmet');
const morgan = require('morgan');           // вся инфо. о запросе к серверу
const config = require('config');           // хранение некоторых параметров в папке config
const startupDebugger = require('debug')('app:startup');    // дебагер для отслеживания
const dbDebugger = require('debug')('app:db');              // запуск - export DEBUG=app:startup,app:db или app:*, отл. DEBUG=
const app = express();

app.set('view engine', 'pug');      // template для ответа
app.set('views', './views');        // который находится в папке views(default)

app.use(express.json());                                // middleware function
app.use(express.urlencoded({ extended: true }));        // для конкотенации данных в форме
app.use(express.static('public'));                      // прямой путь к папке. Example: http://localhost:3000/readme.txt

app.use(helmet());

app.use('/api/courses', courses);       // путь в courses
app.use('/', home);

if (app.get('env') === 'development') {     // process.env.NODE_EVV(undefined если у разраба) = app.get('env') - проверка на каком компе мы находимся
    app.use(morgan('tiny'));                // export NODE_ENV=production (для изменения характеристики)
    startupDebugger('Morgan enabled...');       
}
 
dbDebugger('Some db works...');

app.use(logger);

console.log('Application Name: ' + config.get('name')); // вывод инфо в конфиге
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));   // спрятанных пароль в export app_password=****

const port = process.env.PORT || 3000; // export(send на Windows) PORT=5000 - изменение порта
app.listen(port, () => console.log(`Listening on port ${port}...`));