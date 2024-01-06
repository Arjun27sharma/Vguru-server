const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 5000);
const DB = process.env.MONGO_URI;


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// TODO: Add your routes here

// Connect to MongoDB database
mongoose.connect(DB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
