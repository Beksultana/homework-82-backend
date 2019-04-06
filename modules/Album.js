const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
    name: {
        type: String, required: true
    },
    executor: {
        type: String, required: true
    },
    year: {
        type: String, required: true
    },
    image: {
        type: String
    }
});
const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;