const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersContoller');
const authenticate = require('../middleware/authenticate');

router.post('/place', authenticate, orderController.placeOrder);
router.get('/my-orders', authenticate, orderController.getMyOrders);

module.exports = router;
