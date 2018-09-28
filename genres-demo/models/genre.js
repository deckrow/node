const Joi = require('joi');
const mongoose = require('mongoose');

let genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const scheme = {
        name: Joi.string().min(5).max(52).required()
    };

    return Joi.validate(genre, scheme);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;