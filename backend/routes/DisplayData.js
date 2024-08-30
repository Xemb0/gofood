
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");

//cross
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your actual frontend URL
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  router.use(cors(corsOptions));

router.get("/data",async(req, res)=>{


    const fetch = await mongoose.connection.db.collection("food-detail");
    const data=   await fetch.find({}).toArray()
  
res.send(data
)
})
module.exports = router
