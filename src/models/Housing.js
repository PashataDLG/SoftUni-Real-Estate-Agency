const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    homeImg: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    pieces: {
        type: Number,
        require: true
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