const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'ecommerce'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            res.status(500).send('Error registering user');
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            res.status(500).send('Error logging in');
        } else if (result.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(400).send('Invalid credentials');
        }
    });
});

app.post('/add-to-cart', (req, res) => {
    const { userId, productId } = req.body;
    const query = 'INSERT INTO cart (user_id, product_id) VALUES (?, ?)';
    db.query(query, [userId, productId], (err, result) => {
        if (err) {
            res.status(500).send('Error adding to cart');
        } else {
            res.status(200).send('Product added to cart');
        }
    });
});

app.post('/add-to-wishlist', (req, res) => {
    const { userId, productId } = req.body;
    const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)';
    db.query(query, [userId, productId], (err, result) => {
        if (err) {
            res.status(500).send('Error adding to wishlist');
        } else {
            res.status(200).send('Product added to wishlist');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});