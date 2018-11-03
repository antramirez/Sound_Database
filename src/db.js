//db.js

const mongoose = require('mongoose');

// schema for sounds
const soundSchema = mongoose.schema({
  what: {type: String, required: true},
  where: {type: String, required: true},
  date: {type: String, required: true},
  hour: {type: Number, required: true},
  desc: {type: String, required: true}
})

// register schema
mongoose.model("Sound", soundSchema);

// connect to database
mongoose.connect('mongodb://localhost/hw05');
