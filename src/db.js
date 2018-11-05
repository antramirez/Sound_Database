//db.js

const mongoose = require('mongoose');

// schema for sounds
const soundSchema = mongoose.Schema({
  what: {type: String, required: true},
  where: {type: String, required: true},
  date: {type: String, required: true},
  hour: {type: Number, required: true},
  desc: {type: String, required: true},
  userId: {type: String}
});

// register schema
mongoose.model("Sound", soundSchema);

// connect to database
mongoose.connect('mongodb://localhost/hw05',  {useNewUrlParser: true});
