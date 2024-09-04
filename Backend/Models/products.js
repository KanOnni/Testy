const mongoose = require('mongoose');  // Import mongoose

// Define the schema
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

// Export the model
module.exports = mongoose.model('Product', productSchema);
