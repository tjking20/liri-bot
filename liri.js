//----------below is twitter info---------------
var a = require("./keys.js");
var twitterInfo = a.twitterKeys;//stores the entire twitterKeys object (probably less useful)
// console.log(twitterInfo.consumer_key);
// ----------stop twitter info--------------

var req = require("request");
var userCommand = process.argv[2];
var args = process.argv;
var userRequest = "";
	for(var i = 3; i < args.length; i++ ){
		userRequest = userRequest + " " + args[i];
	}


//switch case allowing the user to switch out the code that he/she wants to request
switch (userCommand){

	//using command "my-tweets " targets my username and publishes my latest tweets
	case "my-tweets":
		var Twitter = require("twitter");
		var client = new Twitter(twitterInfo);

		client.get('search/tweets', {q: 'tjking202'}, function(error, tweets, response) {
   			// var tweetString = JSON.parse(tweets);
   			// console.log(tweets.statuses[0]); 
   			var objectArr = tweets.statuses

   			for(var j = 0; j < objectArr.length; j++){
 
   				var tweetCreated= objectArr[j].created_at;
				var tweetText = objectArr[j].text;
   				console.log("----------------------------------------");
   				console.log("tjking202: " + tweetText);
   				console.log("Created on: "  + tweetCreated);
   			}

		});
		break;


	case "spotify-this-song":
		break;


	case "movie-this"://completed
		var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&tomatoes=true&r=json"

		//requests the targeted url and returns data in JSON
		req(queryUrl, function(error, response, body){
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
		});
		break;

	case "do-what-it-says":


		break;

};