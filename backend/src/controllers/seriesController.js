const fs = require('fs');
const path = require('path');

module.exports = {

    async getEpisode(req, res) {
        let name = req.params.serie;
        let epi = req.params.episode;
        

        const path = `../frontend/src/series/${name}/${epi}.mp4`;

        fs.stat(path, (err, stat) => {

            if (err !== null && err.code === 'ENOENT') {

                console.log(err)
                res.sendStatus(404);
            }

            const fileSize = stat.size
            const range = req.headers.range

            if (range) {

                const parts = range.replace(/bytes=/, "").split("-");

                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

                const chunksize = (end - start) + 1;
                const file = fs.createReadStream(path, { start, end });
                file.audio
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                }

                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                }

                res.writeHead(200, head);
                fs.createReadStream(path).pipe(res);
            }

        });

    },

    async listSeries(req, res) {
        let series = listFoldersInFolder((path.resolve('../frontend/src/series')));

        let listSeries = [];

        series.forEach(x =>{
            let cover = getNameFileInFolderLikeName(path.resolve('../frontend/src/series/'+x),`cover`)[0];
            listSeries.push({
                serie:x,
                cover:cover
            })
        })
        
        res.send(listSeries)

        function listFoldersInFolder(folder) {
            return fs.readdirSync(folder).filter(file => fs.statSync(path.join(folder, file)).isDirectory());
        }

        function getNameFileInFolderLikeName(folder, name) {
            return fs.readdirSync(folder).filter(file => file.includes(name));
        }
            
    
    }





};