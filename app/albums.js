const express = require('express');
const nanoid = require('nanoid');
const config = require('../config');
const multer = require('multer');
const AlbumSchema = require('../modules/Album');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', (req, res) => {
    if (req.query.artists) {
        AlbumSchema.find({artists: req.query.artists})
            .then(result => res.send(result))
            .catch(() => res.sendStatus(500))
    } else {
        AlbumSchema.find()
            .then(result => res.send(result))
            .catch(() => res.sendStatus(500))
    }
});

router.get('/:artistId', (req, res) => {
    AlbumSchema.findOne({artists: req.params.artistId}).populate('artists')
        .then(result => res.send(result))
        .catch(() => res.sendStatus(500))

});

router.post('/', (req, res) => {
    const albumData = req.body;
    albumData.id = nanoid();

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const Album = new AlbumSchema(albumData);

    Album.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error))
});

module.exports = router;