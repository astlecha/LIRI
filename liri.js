var fs = require("fs");
var keys = "";

fs.readFile("keys.js", "utf8", function(error, data){
	if(error){
		console.log(error);
	}
	else{
		keys = data;
	}
})


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