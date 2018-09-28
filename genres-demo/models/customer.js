const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    }
}));

function validateCustomer(customer) {
    const scheme = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(8).max(50).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, scheme);
}

exports.Customer = Customer;
exports.validateCustomer = validate;