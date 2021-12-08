const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RsvpSchema = new Schema({
  "name": {type: String, required: true},
  "email": {type: String, required: true, unique: true},
  "eventId": {type: Schema.Types.ObjectId, ref:'Event'}
}, {timestamps: true});

module.exports = mongoose.model('Rsvp', RsvpSchema);