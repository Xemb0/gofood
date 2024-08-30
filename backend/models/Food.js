const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Food', FoodSchema,);
