const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user')

// Settings
app.set('port', process.env.PORT || 5000);
const DB = process.env.MONGO_URI;



// Middlewares
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(express.json());

// Routes
// TODO: Add your routes here
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to MongoDB database
mongoose.connect(DB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


