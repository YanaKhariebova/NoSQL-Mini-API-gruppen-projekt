require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server runs smoothly!');
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/default_db';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
