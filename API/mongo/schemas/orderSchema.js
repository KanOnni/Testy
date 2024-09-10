const mongoose = require("mongoose");

/* 1. Schema */
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: {type: Date, require: true },
    status: { type: String, required: true }
});

orderSchema.methods.speak = function speak() {
    const greeting = this.status
     ? "I am curently " + this.status
     : "I don't have a state";
    console.log(greeting);
}

/* 2. module */
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };