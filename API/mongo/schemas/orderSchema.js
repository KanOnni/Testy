const mongoose = require("mongoose");

/* 1. Schema */
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: {type: Date, require: true },
    status: { type: String, required: true },
    address: { type: String, required: true }
}, {
    versionKey: false
});

/* 2. module */
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };