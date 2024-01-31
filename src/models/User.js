const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username should be at least 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: [10, 'Email should be at least 10 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password should be at least 4 characters'],
    },
    boughtProducts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Electronic',
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
