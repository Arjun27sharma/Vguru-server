const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user')

// Settings
app.set('port', process.env.PORT || 5000);
const DB = process.env.MONGO_URI;


const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "https://vguru6622.vercel.app"]; // Add your actual allowed origins

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If needed for cookies or authentication
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
}));


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


