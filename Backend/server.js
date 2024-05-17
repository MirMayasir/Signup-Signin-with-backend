const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'Mayasir123', // your MySQL password
    database: 'mayasir'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.get('/', (req, res) => {
    res.send('Hello, World! This is your basic API.');
});

// Handle sign-in form submission
app.post('/users', async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, phone, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('User added successfully');
    });
});

// Endpoint to fetch all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE name = ?'; // Assuming 'name' is used as the username

    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).send('User not found');
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        res.status(200).send('Logged in successfully');
    });
});

app.get('/login', (req, res) => {
    const { username, password } = req.query; // Get username and password from query parameters

    const query = 'SELECT * FROM users WHERE name = ?'; // Assuming 'name' is used as the username

    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).send('User not found');
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        res.status(200).send('Logged in successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
