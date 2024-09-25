const mongoose = require("mongoose");

/* 1. Schema */
const orderItemSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    productId: {type: Date, require: true },
    price: {type: Date, require: true },
    discount: {type: Date, require: true },
    amount: {type: Date, require: true }
});

orderItemSchema.methods.speak = function speak() {
    const greeting = this.orderId
     ? "My owner id is " + this.orderIds
     : "I don't have a owner";
    console.log(greeting);
}

/* 2. module */
const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = { OrderItem };