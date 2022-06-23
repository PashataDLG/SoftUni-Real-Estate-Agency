const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        validate: {
            validator: /^[A-Za-z]+ [A-Za-z]+/g,
            message: 'The full name should be in the following format: "Vince McMahon"'
        }
    },
    username: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 5,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
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