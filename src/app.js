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
  // let sounds;
  Sound.find({}, function(err, soundsInDB, count) {
    // sounds = soundsInDB;
    res.render('home', {sounds: soundsInDB});
  });
});

app.get('/add', (req, res) => {
  res.render('add');
})

app.get('/mine', (req, res) => {
  res.render('mine');
})

// listenn on port 3000
app.listen(3000);
