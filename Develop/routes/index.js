const express = require('express');

// import modular routers for /notes:
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;