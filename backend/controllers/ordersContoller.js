const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.user.user_id }).populate('items.food_id');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const total_price = cart.items.reduce((sum, item) => sum + item.food_id.price * item.quantity, 0);

        const order = new Order({
            user_id: req.user.user_id,
            items: cart.items,
            total_price
        });

        await order.save();
        await Cart.findOneAndDelete({ user_id: req.user.user_id }); // Clear the cart after placing the order

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.user.user_id }).populate('items.food_id');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
