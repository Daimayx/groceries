const mongoose = require("mongoose");


const grocery = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    quantity: Number,
    price: Number,
    picture: String,
});

module.exports = mongoose.model("Grocery", grocery);
