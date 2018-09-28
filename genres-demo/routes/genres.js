const validateObjectId = require('../middleware/valideObjectId');
const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res, next) => { // пример без express-async-errors
    const genres = await Genre.find().sort('name');
    res.send(genres);    
}));

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findbyId(req.params.id);

    if (!genre) return res.status(404).send('Genre that you specified does not exist.');

    res.send(genre);
});

router.post('/', auth,  async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = new Genre({ name: req.body.name });
    await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!genre) return res.status(404).send('Genre that you specified does not exist.');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => { // будет удален если правильный токен и это админ
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('Genre that you specified does not exist.');

    res.send(genre);
});

module.exports = router;