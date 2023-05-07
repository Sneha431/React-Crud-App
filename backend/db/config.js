const mongoose = require("mongoose");

const connectDB = async () => {
  
  // mongoose.connect("mongodb://localhost:27017/e-commerce");
  mongoose.connect("mongodb+srv://root:root@crudappreact.caclqzy.mongodb.net/e-commerce?retryWrites=true&w=majority");

};

connectDB();
