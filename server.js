const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const artist = require('./app/Artist');

const app = express();
app.use(cors());

const port = 9050;

mongoose.connect('mongodb://localhost/lastFM', {useNewUrlParser: true}).then(() => {
    // app.use('/artist', artist);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});