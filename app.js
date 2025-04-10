const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory message store
const messages = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { messages });
});

app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        messages.push({
            name,
            message,
            timestamp: new Date().toLocaleString(),
        });
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
