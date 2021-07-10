const express = require('express');
const router = express.Router();
const seriesController = require('./controllers/seriesController');
const path = require('path');

router.get('/', )

//router.get('/:serie/:episode', seriesController.getEpisode);

router.get('/video/:serie/:episode', seriesController.getEpisode);

router.get('/:serie/:episode', (req, res) => {
    res.sendFile((path.resolve('../frontend/assistindo.html')));
});

module.exports = router;
