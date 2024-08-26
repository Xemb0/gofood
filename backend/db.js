const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
    const fetchData = await mongoose.connection.db.collection("food-detail");
    const data = await fetchData.find({}).toArray();
    // console.log(data);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectDB;
