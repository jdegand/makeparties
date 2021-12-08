const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Rsvp = require('../models/Rsvp');

// /events
router.get('/', (req, res) => {
  /*
  Event.find().then(events => {
    res.render('events-index', { events: events });
  })
  */

  Event.find({}).lean().sort('updatedAt').exec(function(err, events) {
    res.render('events-index', { events: events });
  });


})

router.get('/new', (req, res) => {
  res.render('events-new', {});
})

router.get('/:id', (req, res) => {
  Event.findById(req.params.id).lean().then((event) => {

    Rsvp.find().populate('eventId').lean().then((rsvps) => {
      res.render('events-show', { event: event, rsvps: rsvps })
    })

  }).catch((err) => {
    console.log(err.message);
  })
});

router.get('/:id/edit', (req, res) => {
  Event.findById(req.params.id).lean().then((event) => {
    res.render('events-edit', { event: event });
  }).catch((err) => {
    console.log(err.message);
  })
})

router.post('/', (req, res) => {
  Event.create(req.body).then(event => {
    res.redirect(`/events/${event._id}`)
  }).catch((err) => {
    console.log(err)
  });
})
/*
router.put('/:id', (req, res) => {
  Event.findById(req.params.id).lean().then(event => {
    Event.updateOne(req.body).then(event => {
      res.redirect(`/events/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});
*/

router.put('/:id', (req, res) => {
  Event.findById(req.params.id).then(event => {
    event.title = req.body.title;
    event.desc = req.body.desc;
    event.imgUrl = req.body.imgUrl;
    event.save();
    res.redirect(`/events/${req.params.id}`);
  }).catch((err) => {
    console.log(err);
  });
});

router.delete('/:id', (req, res) => {
  Event.findByIdAndDelete(req.params.id).then(event => {
    res.redirect(`/events`);
  }).catch((err) => {
    console.log(err);
  });
})

// rsvps
router.get('/:id/rsvps/new', (req, res) => {
  Event.findById(req.params.id).then(event => { // .lean()
    res.render('rsvps-new', { event: event, id: req.params.id });
 
   // var numberPattern = /\d+/g;
  // const numbers = event._id.match( numberPattern )
   //console.log(event._id) object 
  });
});

router.post('/:id/rsvps/new', (req, res) => {
  const id = req.params.id;
  Rsvp.create(req.body).then(rsvp => {
      rsvp.save();
      res.redirect(`/events/${id}`);
  }).catch((err) => {
      console.log(err)
  });
});

router.delete('/:id/rsvps/:rid', (req, res) => {

  Rsvp.findByIdAndDelete(req.params.rid).then(rsvp => {
      res.redirect(`/events/${req.params.id}`);
  }).catch((err) => {
      console.log(err);
  });
});


module.exports = router;
