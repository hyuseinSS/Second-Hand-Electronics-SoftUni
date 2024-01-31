const mongoose = require('mongoose');

const electronicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [10, 'Name should be at least 10 characters'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        minlength: [2, 'Type should be at least 2 characters'],
    },
    damages: {
        type: String,
        required: [true, 'Damages is required'],
        minlength: [10, 'Damages should be at least 10 characters'],
    },
    image: {
        type: String,
        required: [true, 'Electronic image is required'],
        validate: {
            validator: (value) => {
                return /^https?:\/\//.test(value);
            },
            message: 'Image URL should start with http:// or https://',
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description should be at least 10 characters'],
        maxlength: [200, 'Description should not exceed 200 characters'],
    },
    productionYear: {
        type: Number,
        required: [true, 'Production year is required'],
        min: [1900, 'Production year should be at least 1900'],
        max: [2023, 'Production year should be at most 2023'],
    },
    exploitationYear: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: 'Exploitation should be a positive number',
        },
    },
    price: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: 'Price should be a positive number',
        },
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ]
});

const Electronic = mongoose.model('Electronic', electronicSchema);

module.exports = Electronic;