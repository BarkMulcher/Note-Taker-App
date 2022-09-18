// import express module
const express = require('express');
const fs = require('fs');
// built-in path module:
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const PORT = process.env.PORT || 8080;

const app = express();

// Middleware for parsing JSON and urlencoded form data:
app.use(express.json());

app.use(express.static('public'));

// GET route for notes.html:
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// wildcard GET route for index.html (homepage):
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);



// app.get('*', (req, res) => 
//     res.sendFile(path.join(__dirname, '../public/index.html'))
// );

// Promise version of fs.readFile:
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    })
};

// GET /api/notes to read db.json file
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db.json')
    .then((data) => 
    res.json(JSON.parse(data)));
});



// POST /api/notes receive & add to the GUI w/ uuid
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    // make sure there is data to enter:
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db.json');

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
})

// delete functionality:
app.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    readFromFile('./db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // make new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);

        // save that array to the file system
        writeToFile('./db.json', result);

        // respond to the DELETE request
        res.json(`Item ${noteId} has been deleted`)
    })
})


// assign port:
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);



// DELETE /api/notes/:id should receive a query parameter containing
// the id of a note to delete. In order to delete a note, you'll need
// to read all notes from the db.json file, remove the note with the
// given id property, and then rewrite the notes to the db.json file.


