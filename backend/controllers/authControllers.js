const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register new user
exports.register = async (req, res) => {
    const { name, email, password, location } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash the password before saving the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user = new User({ name, email, password: hashedPassword, location });
        await user.save();

        const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    const { userId, itemId, name, price, qut, size, img } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if item already exists in the cart
        const cartItem = user.cart.find(item => item.itemId.toString() === itemId && item.size === size);

        if (cartItem) {
            // If item exists, update its quantity
            cartItem.qut += qut;
        } else {
            // If item does not exist, add it to the cart
            user.cart.push({ itemId, name, price, qut, size, img });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    const { userId, cartItemId, quantity } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const cartItem = user.cart.id(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Update the quantity or any other fields if necessary
        cartItem.quantity = quantity;

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const { userId, cartItemId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.cart = user.cart.filter(item => item._id.toString() !== cartItemId);

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getCart = async (req, res) => {
    const { userId } = req.params; // Extract userId from URL params

    try {
        // Fetch user with populated cart.itemId field
        const user = await User.findById(userId).populate({
            path: 'cart.itemId',
            select: 'name description price available' // Specify fields you want to include from Food model
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the cart items with populated Food details
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//get user

// Get user details
exports.getUserDetails = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch user by ID
        const user = await User.findById(userId).populate({
            path: 'cart.itemId',
            select: 'name description price available' // Specify fields to include from Food model
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user details including cart
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//clear the cart
// Clear all items from the cart
exports.clearCart = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Clear the cart by setting it to an empty array
        user.cart = [];
        await user.save();

        // Return the updated cart
        res.json({ message: "Cart cleared", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
