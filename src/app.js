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

const session = require('express-session');

// handlebars layout
app.set('view engine', 'hbs');

// set middleware to serve static content relative to public directory
app.use(express.static(fullPath));

// body parsing middleware
app.use(express.urlencoded({extended: false}));

// set session options middleware
app.use(session({secret: 'secret message', saveUninitialized: false, resave: false}));

// set middleware to keep track of page visits
app.use( (req, res, next) => {
  if (req.session.visits) {
    req.session.visits++;
  }
  else {
    req.session.visits = 1;
  }
  next();
});

// paths
app.get('/', (req, res) => {
  // check if form was submitted to filter
  if (req.query) {
    // find entries that match the filter fields, and if they're missing,
    // match entries that are not null (meaning only filter by fields that are filled out)
    Sound.find({what: req.query.what || {$ne: null}, where: req.query.where || {$ne: null}, date: req.query.date || {$ne: null}, hour: Number(req.query.hour) || {$ne: null} }, function(err, soundsInDB, count) {
      res.render('home', {sounds: soundsInDB, visits: req.session.visits});
    });
  }
  // if no filter, show all sounds
  else {
    Sound.find({}, function(err, soundsInDB, count) {
      res.render('home', {sounds: soundsInDB});
    });
  }
});

app.get('/sounds/add', (req, res) => {
  // show page with form
  res.render('sounds/add', {visits: req.session.visits});
});

app.post('/sounds/add', (req, res) => {
  // create a new sound based on query string (from form)
  // and save it (if the entries are all valid)
  new Sound({
		what: req.body.what,
		where: req.body.where,
    date: req.body.date,
    hour: parseInt(req.body.hour),
    desc: req.body.desc
	}).save(function(err, sounds, count){
    // redirect to homepage
		res.redirect('/');
	});
});

app.get('/sounds/mine', (req, res) => {
  res.render('sounds/mine');
});

// listen on port 3000
app.listen(3000);
