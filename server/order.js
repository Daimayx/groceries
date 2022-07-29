const mongoose = require("mongoose");
const Grocery = require("./grocery");

const order = new mongoose.Schema({
    groceries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grocery' }],
    user: String,
    street: String,
    city: String,
    province: String,
    postalCode: String,
    country: String,
    paymentMethod: String,
    status:String,
});

module.exports = mongoose.model("Order", order);
