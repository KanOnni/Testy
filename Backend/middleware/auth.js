require('dotenv').config(); // Load environment variables

const apiKey = process.env.API_KEY; // Use environment variable for the API key

function authenticateApiKey(req, res, next) {
    const key = req.headers['x-api-key'];
    
    if (!key || key !== apiKey) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
    
    next(); // Proceed to the next middleware or route handler
}

module.exports = authenticateApiKey;
