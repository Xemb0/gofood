const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../model/order") 





    router.post("/myorder", async (req, res) => {
        const userEmail = req.body.user;
        console.log(userEmail);
        
        try {
          const order = await Order.findOne({ 'email': userEmail }); // Fetch order by user email
           res.json({Data : order}); // Send the order data as JSON
          // console.log(order);
         
          
        } catch (error) {
          console.error("Error fetching order:", error.message);
          res.status(500).json({ message: "Server Error" });
        }
      });
  
  

module.exports = router