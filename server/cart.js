const mongoose = require("mongoose");
const grocery = require("./grocery");
const cart = new mongoose.Schema({
  username: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grocery' }],
});

module.exports = mongoose.model("Cart", cart);
