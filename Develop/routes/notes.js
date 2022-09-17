// modeled after routes/feedback.js in mini project

const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET route for retreiving notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json')
    .then((data) => 
    res.json(JSON.parse(data)))
    );

// POST route for submitting notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    // make sure there is a note:
    if (title && text) {
        const newNote = {
            noteTitle,
            NoteText,
            note_id: uuidv4(),
        };

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

module.exports = notes;