const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const productsRouter = require('./Routes/products'); // Assuming this exists

mongoose.connect('mongodb://localhost:27017/local?directConnection=true');

app.use(express.json());
app.use(cors());

app.use('/admin/products', productsRouter);

app.listen(3000, () => console.log('Server started on port 3000'));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));
