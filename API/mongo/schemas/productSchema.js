const mongoose = require("mongoose");

/* 1. Schema */
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {type: String, require: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    discount: { type: Number, required: false },
    color: { type: String, required: true },
    size: { type: String, required: true },
    amount: { type: Number, required: true },
    image: { type: String, required: false }
});

productSchema.methods.speak = function speak() {
    const greeting = this.name
     ? "I am a " + this.name
     : "I don't have a name";
    console.log(greeting);
}

/* 2. module */
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };