// app.js

// require express and path modules, and make an express app
const express = require('express');
const path = require('path');
const app = express();

// require mongoose module to connect to database
const mongoose = require('mongoose');
const db = require('./db');
const Sound = mongoose.model('Sound');

// full path relative to public
const fullPath = path.join(__dirname, 'public');

// handlebars layout
app.set('view engine', 'hbs');

// set middleware to serve static content relative to public directory
app.use(express.static(fullPath));

// body parsing middleware
app.use(express.urlencoded({extended: false}));

// paths
app.get('/', (req, res) => {
  // check if form was submitted to filter
  if (req.query) {
    // find entries that match the filter fields, and if they're missing,
    // match entries that are not null (meaning only filter by fields that are filled out)
    Sound.find({what: req.query.what || {$ne: null}, where: req.query.where || {$ne: null}, date: req.query.date || {$ne: null}, hour: Number(req.query.hour) || {$ne: null} }, function(err, soundsInDB, count) {
      res.render('home', {sounds: soundsInDB});
    });
  }
  // if no filter, show all sounds
  else {
    Sound.find({}, function(err, soundsInDB, count) {
      res.render('home', {sounds: soundsInDB});
    });
  }
});

app.get('/add', (req, res) => {
  res.render('add');
})

app.get('/mine', (req, res) => {
  res.render('mine');
})

// listenn on port 3000
app.listen(3000);
