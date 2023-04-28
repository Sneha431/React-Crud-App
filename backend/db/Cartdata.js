const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
  cartquantity: String,
});

module.exports = mongoose.model("cartdata", cartSchema);
