const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post('/order', async (req, res) => {
    const { user, order_data } = req.body;

    // Check if user and order_data are provided
    if (!user || !order_data) {
        return res.status(400).json({ success: false, message: "User and order data are required" });
    }

    try {
        // Check if the user already exists in the database
        let existingUserOrder = await Order.findOne({ email: user });

        if (!existingUserOrder) {
            // Create a new order document if the user does not exist
            try {
                await Order.create({
                    email: user,
                    order_data: [order_data] // Correctly store order_data as an array
                });
                return res.json({ success: true });
            } catch (error) {
                console.error("Error while creating first order:", error.message);
                return res.status(500).json({ success: false, message: "Server error while creating the first order", error: error.message });
            }
        } else {
            // Update the existing user's order data
            try {
                await Order.findOneAndUpdate(
                    { email: user },
                    { $push: { order_data: order_data } } // Correctly add order_data without nested array
                );
                console.log("Order updated for user:", user);
                return res.json({ success: true });
            } catch (error) {
                console.error("Error while updating order:", error.message);
                return res.status(500).json({ success: false, message: "Server error while updating the order", error: error.message });
            }
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
