var fs = require("fs");
var request = require("request");
var action = process.argv[2];
var keys = "";

switch(action){
	case "my-tweets":
		tweets();
		break;
	case "spotify-this-song":
		spotify();
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
function spotify(){
	var Spotify = require('node-spotify-api');
	 
	var spotify = new Spotify({
	  id: "8cd3e07007294624ac4c8a420e70c9e0",
	  secret: "dc40df49627045e9ba0214d2019bdbb1"
	});

	var trackArr = process.argv;
	var tempArr = [];

	for(var i = 3; i<trackArr.length; i++){
		// track = trackArr[i];
		tempArr.push(trackArr[i])
	}
	
	var result = tempArr.join("+");
	

	if (result === ""){
		spotify.search({ type: 'track', query: 'The Sign' }, function(error, data) {
			if (error) {
				return console.log('Error occurred: ' + error);
			}
			else{
				console.log("Song: "+data.tracks.items[0].name);
				console.log("Artist: "+data.tracks.items[0].artists[0].name);
				console.log("Album: "+data.tracks.items[0].album.name);
				console.log("Link: "+data.tracks.items[0].preview_url);
			}
		})
	}
	else {
		spotify.search({ type: 'track', query: result }, function(error, data) {
			if (error) {
				return console.log('Error occurred: ' + error);
			}
			else{
				console.log("Song: "+data.tracks.items[0].name);
				console.log("Artist: "+data.tracks.items[0].artists[0].name);
				console.log("Album: "+data.tracks.items[0].album.name);
				console.log("Link: "+data.tracks.items[0].preview_url);
			}
		})
	}
}


//movie-this command
function movie() {
	//Store arguments in an array
	var nodeArgs = process.argv
	//Store movie name in empty var
	var movieName = "";

	//Loop through the words in the node argument to define var movieName
	for(var i = 3; i < nodeArgs.length; i++){
		if (i > 3 && i < nodeArgs.length){
			//Add plus signs between multiple words 
			movieName = movieName + "+" + nodeArgs[i];
			console.log("Movie chosen with concatination: "+movieName);
		}
		else{
			movieName += nodeArgs[i];
			console.log("Movie chosen: "+movieName);
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
			spotify();
		}
	})
}