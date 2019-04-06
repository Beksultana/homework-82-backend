const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ArtistSchema = new Schema({
    executor: {
       type: String, required: true
   },
    image: {
       type: String
    },
    description: {
       type: String
    },
});
const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;