const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); //https://toster.ru/q/414295
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey')); // config для скрытия ключа
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const scheme = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, scheme);
}

exports.User = User;
exports.validate = validateUser;