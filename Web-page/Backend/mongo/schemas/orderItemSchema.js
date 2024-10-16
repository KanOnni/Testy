const mongoose = require("mongoose");

/* 1. Schema */
const orderItemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productId: {type: mongoose.Schema.Types.ObjectId, require: true },
    price: {type: mongoose.Schema.Types.Decimal128, require: true },
    discount: {type: Number, require: true },
    amount: {type: Number, require: true }
}, {
    versionKey: false
});

/* 2. module */
const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = { OrderItem };