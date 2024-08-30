const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ 
        food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        quantity: { type: Number, required: true },
    }],
    total_price: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    order_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
