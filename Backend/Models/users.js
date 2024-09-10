const mongoose = require('mongoose');  // Import mongoose

// Define the schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {type: String, require: true },
    adress: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('User', userSchema);
