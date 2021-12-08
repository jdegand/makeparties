const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  "title": {type: String, required: true},
  "desc": {type: String, required: true},
  "imgUrl": {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Event', EventSchema);