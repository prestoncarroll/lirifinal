// examply of object destructoring
const { SPOTIFY_ID, SPOTIFY_SECRET } = process.env;
exports.spotify = {
    id: SPOTIFY_ID,
    secret: SPOTIFY_SECRET
};

