const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qut: {
        type: Number,
        default: 1,
    },
    size: {
        type: String,
        required: true,
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: String,
    cart: [cartItemSchema], // Nested cart structure
});

module.exports = mongoose.model('User', userSchema);
