const mongoose = require('mongoose');
const config = require('./config');

const Artist = require('./modules/Artist');
const Album = require('./modules/Album');
const Track = require('./modules/Track');

const run = async () => {
    await mongoose.connect(config.artistsDb, config.mongooseOptions);
    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for(let collection of collections){
        await collection.drop();
    }

    const artists = await Artist.create(
        {executor: 'Ketsa', description: "It's Roxy"},
        {executor: 'Daniel Birch', description: "Rising Bells"},
    );

    const albums = await Album.create(
        {
            albumName: 'Different Angles',
            year: "2012",
            artists: artists[0]._id,
            image: 'ketsa.png'
        },
        {
            albumName: 'Ambient Bells',
            year: "2015",
            artists: artists[1]._id,
            image: 'daniel.png'
        },
    );

    await Track.create(
        {trackName: 'Its Roxy', albums: albums[0]._id, duration: '05:20'},
        {trackName: 'Rising Bells', albums: albums[1]._id, duration: '03:20'},
    );
    await  connection.close()
};

run().catch(error => {
    console.log('Something went wrong', error);
});