const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const CartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema],
});

module.exports = mongoose.model('Cart', CartSchema);
