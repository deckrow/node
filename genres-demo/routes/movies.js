const { Movie, validate } = require('../models/movie');
const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('name');
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findbyId(req.params.id);

    if (!movie) return res.status(404).send('Genre that you specified does not exist.');

    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findbyId(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.')
    
    const movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();

    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!movie) return res.status(404).send('Genre that you specified does not exist.');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('Genre that you specified does not exist.');

    res.send(movie);
});

module.exports = router;