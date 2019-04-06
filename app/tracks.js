const express = require('express');
const TrackSchema = require('../modules/Track');
const router = express.Router();

router.get('/', (req, res) => {
    TrackSchema.find().populate('albums')
        .then(result => res.send(result))
        .catch(() => res.sendStatus(500))
});

module.exports = router;