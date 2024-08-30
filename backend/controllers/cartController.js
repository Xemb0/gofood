

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.itemId');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addItemToCart = async (req, res) => {
    const { itemId, name, quantity, price } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(item => item.itemId.toString() === itemId);

        if (itemIndex > -1) {
            // Item already exists in cart, update quantity
            user.cart[itemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            user.cart.push({ itemId, name, quantity, price });
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.removeItemFromCart = async (req, res) => {
    const { itemId } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = user.cart.filter(item => item.itemId.toString() !== itemId);

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Clear user's cart
exports.clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = [];
        await user.save();
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

