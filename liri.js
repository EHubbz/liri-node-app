/* liri will take the following:
* `my-tweets`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says`
*/


//requring external files and assigning user input variables
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var songArray = [];
var arg1 = process.argv[2];
var arg2 = process.argv[3];



//finding info from Spotify for Spotify function

var getArtist = function(artist) {
	return artist.name;
};

var getSongs = function(song) {
	if (song === undefined) {
		song = "The Sign";
	};
var songs = songs.tracks.items;
};

spotify.search({type: 'track', query: 'I Want It That Way'}, function(err, data) {
  if (err) {
    return console.log('Error: ' + err);
  }
 	console.log(data.tracks.items[0].artists[0].name); 
 	console.log(data.tracks.items[0].album.name);
 	console.log(data.tracks.items[0].name);
 	console.log(data.tracks.items[0].preview_url);
});


//getting tweets from Twitter for Twitter function

var getTweets = function() {
	var client = new Twitter(keys.twitter);
	var params = {screen_name: "e_r_i_n1981", count: 20};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {
			return console.log(tweets);
		}
	});
	var tweetArray = [];
		for (var i = 0; i < tweets.length; i++) {
			tweetArray.push({
				"created at:" : tweets[i].created_at,
				"tweets:" : tweets[i].text
			});
		};
	console.log(tweetArray);
};

	//getting movie from OMDBfor movie function

var getMovie = function(title) {
	if (title === undefined) {
		title = "Mr. Nobody";
	}
var movieTitle = process.argv[3];
var url = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true"

request(url, function(err, response, body) {
	if (err && response.statuscode == 200) {
		var movieData = [];
		var json = JSON.parse(body);

		movieData.push({
			"Title: " : json.Title,
			"Year: " : json.Year,
			"Rated: " : json.Rated,
			"IMDB Rating: " : json.imdbRating,
			"counry: " : json.Country,
			"Language:" : json.Language,
			"Plot: " : json.Plot,
			"Actors: " : json.Actors,
			"Rotten Tomatoes Rating: " : json.tomatoRating,
			"Rotten Tomatoes URL: " : json.tomatoURL,
		});
		console.log(movieData);
	}
});
};
	
	// do-what-it-says function

var doIt = function() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		console.log(data);
		var dataArray = data.split(",")

		if (dataArray.length == 2) {
		pick(dataArray[0], dataArray[1]);
		}
		else if (dataArray.length == 1) {
			pick(dataArray[0]);
		}
	});
}

//switch case to determine which function to run based on user input

var cases = function(arg1) {
  switch(arg1) {
    case "my-tweets":
      getTweets();
      break;
    case "spotify-this-song":
      getSongs();
      break;
    case "movie-this":
      getMovie();
      break;
    case "do-what-it-says":
      doIt();
      break;
    default:
      console.log("Invalid");
  };
};

//declaring run function

var run = function(arg1, arg2) {
	cases(arg1, arg2);
};

//calling run function to begin application

run();

