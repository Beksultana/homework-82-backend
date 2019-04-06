const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const artists = require('./app/Artist');
const app = express();

app.use(express.json());
app.use(cors());

const port = 9000;

mongoose.connect('mongodb://localhost/lastFM', {useNewUrlParser: true}).then(() => {
    app.use('/artists', artists);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});