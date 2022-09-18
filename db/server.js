// import express module
const express = require('express');
// built-in path module:
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// GET /api/notes to read db.json file
app.get('/api/notes', (req, res) => {
    const response = JSON.parse(
        fs.readFileSync('/db/db.json').toString())
        res.send( response );
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

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
})

// assign port:
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

// You haven’t learned how to handle DELETE requests, but this 
//application has that functionality in the front end. As a bonus,
// see if you can add the DELETE route to the application using 
//the following guideline:

// DELETE /api/notes/:id should receive a query parameter containing
// the id of a note to delete. In order to delete a note, you'll need 
// to read all notes from the db.json file, remove the note with the
// given id property, and then rewrite the notes to the db.json file.


