const mongoose = require("mongoose");
const User = require("./User");
const connectDB = async () => {
  mongoose.connect("mongodb://localhost:27017/e-commerce");

  const data = await User.find();
  console.log(data);
};
connectDB();
