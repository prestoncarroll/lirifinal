require("dotenv").config();

//spotify-this-song
//movie-this


//linking keys.js
const spotifykeys = require('./keys.js');
//linking axios
let axios = require("axios");
//linking fs
let fs = require("fs");
//grabbing spotify api with node
let Spotify = require('node-Spotify-api');
//grabbing new info with spotify
let spotify = new Spotify(spotifykeys.spotify);

//sets to array containing the command line arguments
const [node, file, ...args] = process.argv;


//giving a default search to searching a movie
if (args[0] === "movie-this") {
    if (args[1] === undefined) {
        getMovie("step+brothers");
    }
    else {
        getMovie(args.slice(1).join("+"));
    };
};


//giving a default search when searching a song
if (args[0] === "spotify-this-song") {
    if (args[1] === undefined) {
        spotifysong("sicko mode");
    }
    else {
        let songTitle = args.slice(1).join(" ");
        spotifysong(songTitle);
    };
};


//song search function
function spotifysong(songName) {
    //letting you search by name ,gives you a limit of results 
    spotify.search({ type: 'track', query: songName, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error: ' + err);
        }
        //gives the order of properties from the api list
        data.tracks.items.forEach(function (element) {
            console.log(" ");
            console.log(`Artist: ${element.artists[0].name}`);
            console.log(`song: ${songName}`);
            console.log(`spotify Preview Link: ${element.preview_url}`);
            console.log(`Album: ${element.album.name}`)
        });
    })
};
//get movie function
function getMovie(movieName) {

    axios
        //gets the movie name from ombd link along with api key
        .get(`http://www.omdbapi.com/?t=${movieName}&apikey=cf1c54e0`)
        .then(function (movie) {

            //fills in all of the movie information from the json

            console.log(" ");
            console.log(`Ttile: ${movie.data.Title}`);
            console.log(`Released: ${movie.data.Year}`);
            console.log(`IMDB Rating: ${movie.data.Ratings[0].value}`);
            console.log(`Rotten Tomatoes Rating: ${movie.data.Ratings[1].value}`);
            console.log(`Produced in: ${movie.data.Country}`);
            console.log(`Plot: ${movie.data.Plot}`);
            console.log(`Starring: ${movie.data.Actors}`)

        })
        //test for errors
        .catch(function (err) {
            console.log(err);
        });
};

