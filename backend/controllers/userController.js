const User = require('../models/User');
const FoodItem = require('../models/Food');

const addToCart = async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id); // Assuming req.user contains authenticated user's ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const item = await FoodItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const cartItem = user.cart.find(cartItem => cartItem.itemId.toString() === itemId);
    
    if (cartItem) {
      // Update quantity if item is already in cart
      cartItem.quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({
        itemId: item._id,
        name: item.name,
        quantity,
        price: item.price,
      });
    }

    await user.save();
    res.json({ message: 'Item added to cart successfully', cart: user.cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addToCart };
