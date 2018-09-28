const mongoose = require(mongoose);

const id = new mongoose.Types.ObjectId(); // создание рандомного id
console.log(id.getTimestamp()); // получение времени создания

const isValid = mongoose.Types.ObjectId.isValid('1234'); // проверка на валидность
console.log(isValid);