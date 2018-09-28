const Joi = require('joi');
const { User } = require('../models/genre');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();

//Аутентификация - вход в систему. 
//Авторизация - получение доступа к инфе из базы данных.

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email }); 
    if (user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);//compare берет salt и сравнивает body.password и user.password
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    const scheme = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, scheme);
}