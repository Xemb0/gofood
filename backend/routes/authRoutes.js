const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Cart routes (handled within authController)
router.post('/cart/add', authController.addToCart);
router.put('/cart/update', authController.updateCartItem);
router.delete('/cart/remove', authController.removeFromCart);
router.get('/cart/get/:userId', authController.getCart)
router.delete('/cart/clearall/:userId', authController.clearCart);
// Get user details
router.get('/user/:userId', authController.getUserDetails);

router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'API is working!' });
});

module.exports = router;
