const mongoose = require('mongoose');

const { Schema } = mongoose;


const User = new Schema({
    uid: {
        type: String,
        required: true
    },
    userName: {
type: String,
required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    photoUrl: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, { timestamps: true});



module.exports = mongoose.model('User', User)