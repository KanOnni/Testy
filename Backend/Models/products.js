const mongoose = require('mongoose');  // Import mongoose

// Define the schema
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false }
});

// Export the model
module.exports = mongoose.model('Product', productSchema);
