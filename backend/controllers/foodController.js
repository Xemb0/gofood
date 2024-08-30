const Food = require('../models/Food');

// Get all food items
exports.getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single food item by ID
exports.getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: "Food item not found" });
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add a new food item
exports.addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // Validate input
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newFood = new Food({
            name,
            description,
            price,
            category,
        });

        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update an existing food item
exports.updateFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category },
            { new: true }
        );

        if (!updatedFood) return res.status(404).json({ message: "Food item not found" });

        res.json(updatedFood);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a food item
exports.deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);

        if (!food) return res.status(404).json({ message: "Food item not found" });

        res.json({ message: "Food item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

