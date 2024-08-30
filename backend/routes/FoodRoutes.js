const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all food items
router.get('/', foodController.getAllFoods);

// Get a single food item by ID
router.get('/:id', foodController.getFoodById);

// Add a new food item
router.post('/', foodController.addFood);

// Update an existing food item
router.put('/:id', foodController.updateFood);

// Delete a food item
router.delete('/:id', foodController.deleteFood);

module.exports = router;
