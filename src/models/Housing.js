const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    houseName: {
        type: String,
        require: [true, 'House name is required'],
        minLength: [6, 'The house name must be at least 6 characters long'],
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        require: true
    },
    year: {
        type: Number,
        require: true,
        validate: {
            validator: function(year){
                return year >= 1850 && year <= 2021
            },
            	message: 'The year must be between 1850 and 2021'
        }
    },
    city: {
        type: String,
        require: true,
        minLength: [4, 'The city name must be at least 4 characters long']
    },
    homeImg: {
        type: String,
        require: true,
        validate: {
            validator: /^http?/g,
            message: 'The image URL must start with http/s!'
        }
    },
    description: {
        type: String,
        require: true,
        maxLength: [60, 'The description must be no more than 60 characters long']
    },
    pieces: {
        type: Number,
        require: true,
        validate: {
            validator: function(pieces){
                return pieces >= 0 && pieces <= 10
            },
            	message: 'The Available Pieces should be positive number (from 0 to 10)'
        }
    },
    rentedHome: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('Housing', housingSchema);

module.exports = User;