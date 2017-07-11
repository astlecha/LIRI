var fs = require("fs");
var action = process.argv[2];
var keys = "";

switch(action){
	case "my-tweets":
		tweets();
		break;
	case "spotify-this-song":
		break;
	case "movie-this":
		movie();
		break;
	case "do-what-it-says":
		random();
		break;
}

//my-tweets command
function tweets(){
	fs.readFile("keys.js", "utf8", function(error, data){
		if(error){
			console.log(error);
		}
		else{
			keys = data;
		}
	})
}

//spotify-this-song command
// var songName = process.argv[3];
	//artist
	//song name
	//preview song link
	//album the song is from

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 8cd3e07007294624ac4c8a420e70c9e0,
  secret: dc40df49627045e9ba0214d2019bdbb1
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	if (err) {
		return console.log('Error occurred: ' + err);
	}
	console.log(data); 
});


//movie-this command
function movie() {
	//Request npm package after it has been installed
	var request = require("request");
	//Store arguments in an array
	var nodeArgs = process.argv
	//Store movie name in empty var
	var movieName = "";

	//Loop through the words in the node argument to define global var movieName
	for(var i = 2; i < nodeArgs.length; i++){
		if (i > 2 && i < nodeArgs.length){
			//Add plus signs between multiple words 
			movieName = movieName + "+" + nodeArgs[i]
		}
		else{
			movieName += nodeArgs[i];
		}
	}

	//Define the OMDB Query URL
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
		//If there's no error and the response code is 200, log the movie info
		if (!error && response.statusCode===200){
			console.log(JSON.parse(body));
		}
	})
}

//do-what-it-says command (aka random.txt)
function random(){
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		}
		else{
			console.log(data);
			return data;
		}
	})
}