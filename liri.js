//targets information from the terminal array
var userCommand = process.argv[2];
var args = process.argv;
var userRequest = "";
	for(var i = 3; i < args.length; i++ ){
		userRequest = userRequest + " " + args[i];
	}

function switchy(){

	//switch case excutes different blocks of code based on what the user wants to do
	switch (userCommand){

		//using command, my-tweets, targets my username and publishes my latest tweets
		case "my-tweets": //completed
			var a = require("./keys.js");
			var twitterInfo = a.twitterKeys;//stores the entire twitterKeys object
			var Twitter = require("twitter");
			var client = new Twitter(twitterInfo);

			//requests tweets from the user tjking202
			client.get('search/tweets', {q: 'tjking202'}, function(error, tweets, response) {
				if(error){
					console.log("Error occurred: " + error);
					return;
				}else{

		   			var tweetsArr = tweets.statuses
		   			for(var j = 0; j < tweetsArr.length; j++){
		 				
		 				//targets specific data in the tweets object, and returns it in a readable format
		   				var tweetCreated= tweetsArr[j].created_at;
						var tweetText = tweetsArr[j].text;
		   				console.log("----------------------------------------");
		   				console.log("tjking202: " + tweetText);
		   				console.log("Created on: "  + tweetCreated);
		   			};
				};	
			});

			break;


		//using command, spotify-this-song, provides information about the song that the user requests
		case "spotify-this-song":

			var spotify = require('spotify');

			//if the user does not designate a song to look for, it provides a pre-designated song.
			if (userRequest == "") userRequest = "hey jude";
			
			//sportify search returns an object of information based on the users song request 
			spotify.search({ type: 'track', query: userRequest }, function(err, data) {
			    if ( err ) {
			        console.log("Error occurred: " + err);
			        return;
			    }else{
			    	//console logs display relevant information in a readable format
			    	var songInfo = data.tracks.items[0];
			    	console.log("Artist: " + songInfo.artists[0].name);
			    	console.log("Song: " + songInfo.name);
			    	console.log("Album: " + songInfo.album.name);
			    	console.log("Preview: " + songInfo.preview_url);
			    };
			});
			
			break;

		//using command, movie-this, allows the user to search for movie information that he/she chosses
		case "movie-this":

			//provides alternative movie if user does not designate one
			if (userRequest == ""){
				userRequest = "mr nobody"
			};

			//requests info about the movie/parameters designated in the url, then returns data in JSON
			var req = require("request");
			var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&tomatoes=true&r=json"
			req(queryUrl, function(error, response, body){
				if (error){
					console.log(error);
					return;
				} else{
					var movie = JSON.parse(body);//parses JSON data and makes it readable
					console.log("Title: " + movie["Title"]);
					console.log("Released: "+ movie["Year"]);
					console.log("IMDB Rating: " + movie["imdbRating"]);
					console.log("Produced In: " + movie["Country"]);
					console.log("Language: " + movie["Language"]);
					console.log("Plot: " + movie["Plot"]);
					console.log("Actors: " + movie["Actors"]);
					console.log("Rotten Tomatoes Rating: " + movie["tomatoRating"]);
					console.log("Rotten Tomatoes URL: " + movie["tomatoURL"]);
				};
			});

			break;

		//using the command, do-what-it-says, allows the user to execute the request from a second file.
		case "do-what-it-says":
			var fs = require("fs");

			//uses the built in fs functionality to read data string from a second file
			fs.readFile("random.txt", "utf-8", function(error, data){
				if(error){
					console.log("Error occurred: " + error);
					return;
				}else{

					//splits the string into an array, and reassigns the userCommand/Request values
					terminalCommand = data.split(",");
					userCommand = terminalCommand[0];
					userRequest = terminalCommand[1];
					
					//executes the switchy function again, using the reassigned userCommand/Request from random.txt
					switchy();	
				};
			});
			break;
	};
};

switchy(); //initial execute of swithcy function. 

