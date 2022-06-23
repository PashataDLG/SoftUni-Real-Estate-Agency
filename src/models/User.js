const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.virtual('repeatPassword').set(function(value) {
    if(this.password !== value){
        throw{
            message: 'Passwords does not match'
        };
    }
});

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {
            this.password = hashedPassword;

            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;