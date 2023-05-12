const mongoose = require("mongoose");
var random = require("random-string-alphanumeric-generator");
const checkoutSchema = new mongoose.Schema({
  //   name: String,
  //   price: String,
  //   category: String,
  //   userId: String,
  //   company: String,
  //   cartquantity: String,
  Checkoutdata: Array,
  orderID: String,
});

module.exports = mongoose.model("checkouttdata", checkoutSchema);
