const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const artists = require('./app/Artist');
const albums = require('./app/Album');
const app = express();

app.use(express.json());
app.use(cors());

const port = 9000;

mongoose.connect('mongodb://localhost/lastFM', {useNewUrlParser: true}).then(() => {
    app.use('/artists', artists);
    app.use('/albums', albums);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});