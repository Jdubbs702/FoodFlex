const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique:true, collation:{ locale: 'en_US', strength: 1 }},
    password: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.connection.useDb("food_flex", { useCache: true }).model('User', userSchema);