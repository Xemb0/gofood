const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

// Define routes and attach middleware
router.post('/', authenticate, cartController.addItemToCart);
router.get('/', authenticate, cartController.getCart);
router.delete('/', authenticate, cartController.removeItemFromCart);
router.delete('/clear', authenticate, cartController.clearCart);

module.exports = router;
