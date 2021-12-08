const express = require('express');
const router = express.Router({mergeParams: true});
const Event = require('../models/Event');
const Rsvp = require('../models/Rsvp');

// /events
router.get('/new', (req, res) => {
    Event.findById(req.params.eventId).then(event => {
      res.render('rsvps-new', { event: event });
    });
});

router.post('/', (req, res) => {
    const id = req.params.id;
    console.log(id);
    /*
    Rsvp.create(req.body).then(rsvp => {
        res.redirect(`/`);
    }).catch((err) => {
        console.log(err)
    });
    */
   
});


module.exports = router;