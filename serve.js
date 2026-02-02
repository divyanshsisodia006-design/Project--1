require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware (Setup)
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve your HTML/CSS files

// 2. Database Connection (MongoDB)
// Replace 'YOUR_MONGODB_URI' with your actual connection string in .env file
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/choudhryRestaurant')
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ Database Connection Error:', err));

// 3. Define Database Schema (What a Reservation looks like)
const ReservationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    guests: Number,
    date: Date,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

// 4. API Routes (The Back-end Logic)

// Route to get the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle Form Submission (POST)
app.post('/api/reserve', async (req, res) => {
    try {
        const newReservation = new Reservation({
            name: req.body.name,
            phone: req.body.phone,
            guests: req.body.guests,
            message: req.body.message
        });

        await newReservation.save();
        
        console.log("New Reservation Saved:", req.body.name);
        res.status(201).json({ success: true, message: 'Reservation Sent Successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error. Please try again.' });
    }
});

// 5. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});