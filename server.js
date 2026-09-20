const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./coolchain.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Initialize Bookings Table
db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_id TEXT UNIQUE NOT NULL,
        farmer_name TEXT NOT NULL,
        crop_type TEXT NOT NULL,
        quantity REAL NOT NULL,
        duration INTEGER NOT NULL,
        delivery_mode TEXT NOT NULL,
        total_cost REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// API: Get all bookings
app.get('/api/bookings', (req, res) => {
    const query = `SELECT * FROM bookings ORDER BY created_at DESC`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// API: Create new booking
app.post('/api/bookings', (req, res) => {
    const { farmer_name, crop_type, quantity, duration, delivery_mode, total_cost } = req.body;

    if (!farmer_name || !crop_type || !quantity || !duration || !delivery_mode || total_cost === undefined) {
        return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    const booking_id = 'CC-' + Math.floor(100000 + Math.random() * 900000);

    const query = `
        INSERT INTO bookings (booking_id, farmer_name, crop_type, quantity, duration, delivery_mode, total_cost)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [booking_id, farmer_name, crop_type, quantity, duration, delivery_mode, total_cost], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: 'Booking successfully created',
            booking: {
                id: this.lastID,
                booking_id,
                farmer_name,
                crop_type,
                quantity,
                duration,
                delivery_mode,
                total_cost
            }
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`CoolChain server running on http://localhost:${PORT}`);
});