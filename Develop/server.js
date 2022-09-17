// import express module
const express = require('express');
// built-in path module:
const path = require('path');
const api = require('./public/assets/scripts/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// wildcard GET route for index.html (homepage):
app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes.html:
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// assign port:
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

