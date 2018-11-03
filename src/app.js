// app.js

// require express and path, and make an express app
const express = require('express');
const path = require('path');
const app = express();

// set middleware to serve static content relative to public directory
const fullPath = path.join(__dirname, 'public');
app.use(express.static(fullPath));

// body parsing middleware
app.use(express.urlencoded({extended: false}));

// handlebars layout
app.set('view engine', 'hbs');

// listenn on port 3000
app.listen(3000);
