const express = require('express');
const router = express.Router();
const seriesController = require('./controllers/seriesController');
const path = require('path');

router.get('/', )

//router.get('/:serie/:episode', seriesController.getEpisode);





router.get('/list/series', seriesController.listSeries);



router.get('/list/episodes/:serie', seriesController.listEpisode);

router.get('/video/:serie/:episode', seriesController.getEpisode);

router.get('/getcover/:serie', seriesController.getCover);

router.get('/series', (req, res) => {
    res.sendFile((path.resolve('../frontend/listseries.html')));
})

router.get('/series/:serie/episodios', (req, res) => {
    res.sendFile((path.resolve('../frontend/listepisodes.html')));
})

router.get('/:serie/:episode/assistir', (req, res) => {
    res.sendFile((path.resolve('../frontend/assistindo.html')));
});


module.exports = router;
