const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const auth = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function () {
    app.use(express.json());
    app.use('/api/genres', genres); // регистрация middleware ф-ций
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/returns', auth);
    app.use(error);
}