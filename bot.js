// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var broSearch = {q: "#bro", count: 10, result_type: "recent"}; 
var californiaSearch = {q: "#california", count: 10, result_type: "recent"};
var surfSearch = {q: "#surf", count: 10, result_type: "recent"};

var tweetsAt = [
	' ',
	'Always be a bro. #bro',
	'Look to the sunshine mi amigo.',
	'When life gives you clear skies, catch the waves. #surf',
	'You should have been at the beach yesterday.',
	'I saw you shredding the waves the other day. #california'
];

var tweetsAt2 = [
	' ',
	'Want to shred the gnar later?',
	'Smoothies sometime?',
	'Want to go look for new boards?',
	'Catch a movie later?',
	'Surf, Tan, Laundry? #bro'
];

var ownTweets = [
	' ',
	'The waves are great today. #california',
	'Live. Love. Surf.',
	'Surf\'s up.',
	'So stoked about the weather.',
	'If in doubt, paddle out.',
	'It was gnarly out there! #california',
	'Surf\'s up is the best movie out there. #surf',
	'Hang ten.',
	"My arms are like noodles right now."
];

var verbs = [
	' ',
	'ride',
	'walk',
	'roll out',
	'drive'
];

var nouns = [
	' ',
	'the beach',
	'the surf shop',
	'In-N-Out Burger',
	'the concert'
];


function post(s) {
	T.post('statuses/update', { 
		status: s }, 
		function(err, data, response) { 
			console.log(data) })
}

function tweet() {
	var randomNum1 = Math.floor((Math.random() * 9) + 1);
	var randomNum2 = Math.floor((Math.random() * 5) + 1);
	var randomNum3 = Math.floor((Math.random() * 3) + 1);
	var randomNum4 = Math.floor((Math.random() * 3) + 1);
	var randomNum5 = Math.floor((Math.random() * 3) + 1);
	var randomNum6 = Math.floor((Math.random() * 5) + 1);
	var randomNum7 = Math.floor((Math.random() * 20) + 1)
	var user;


	if (randomNum4 == 1) { //9 unique posts
		post(ownTweets[randomNum1]);
	
	} else if (randomNum4 == 2) { //36 unqiue posts
		var randNoun = Math.floor((Math.random() * 4) + 1);
		var randVerb = Math.floor((Math.random() * 4) + 1);
		var sentence1 = 'Who wants to ' + verbs[randVerb] + ' to ' + nouns[randNoun] + ' whenever they\'re free later? #bro';
		var sentence2 = 'I hope the ' + nouns[randNoun] + ' is happening later. I plan to ' + verbs[randVerb] + ' there soon.'; 
		var sentence3 = 'It\'s too bad that ' + nouns[randNoun] + ' is super crowded today. #california';

		if (randomNum5 == 1) {
			post(sentence1);
		} else if (randomNum5 == 2) {
			post(sentence2);
		} else if (randomNum5 == 3) {
			post(sentence3);
		}



	} else if (randomNum4 == 3) { //35 unqique posts
		T.get('followers/ids', { 
		screen_name: 'california' }, 
			function (err, data) { 
				var followers = data.ids; 
				T.get('users/show', {
					user_id: followers[randomNum7] },
					function (err, data) {
						console.log(data.screen_name);
						user = data.screen_name;
						var combine = '@' + user + ' ' + tweetsAt[randomNum2] + ' ' + tweetsAt2[randomNum6];
						if (randomNum3 == 1) {
							post('@' + user + ' ' + tweetsAt[randomNum2]);   
						} else if (randomNum3 == 2) {
							post('@' + user + ' ' + tweetsAt2[randomNum6]);
						} else if (randomNum3 == 3) {
							post(combine);
						}
					})
				}) 
	}
} 




function follow() {
	var randomNum12 = Math.floor((Math.random() * 20) + 1);
	T.get('followers/ids', {
	screen_name: 'wsl' },
		function (err, data) {
			var followers = data.ids;
			var follower = followers[randomNum12];
			T.post('friendships/create', { id: follower },  function (err, data) {  
				console.log('Followed a new user!');
			})
		})
}




function favorite() {
 	var randomNum10 = Math.floor((Math.random() * 3) + 1);
	var randomNum11 = Math.floor((Math.random() * 10) + 1);
	console.log(randomNum11);
	if (randomNum10 == 1) {
		T.get('search/tweets', broSearch, function (error, data) {
			console.log(error, data);

			if (!error) {
				var favoriteId = data.statuses[randomNum11].id_str;

				T.post('favorites/create', { id: favoriteId }, function (error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have favorited something.')
				}
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			})
		  }
		  else {
		  	console.log('There was an error with your hashtag search:', error);
		  }
		});
	} else if  (randomNum10 == 2 ) {
		T.get('search/tweets', californiaSearch, function (error, data) {
			console.log(error, data);

			if (!error) {
				var favoriteId = data.statuses[randomNum11].id_str;

				T.post('favorites/create', { id: favoriteId }, function (error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have favorited something.')
				}
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			})
		  }
		  else {
		  	console.log('There was an error with your hashtag search:', error);
		  }
		});
	} else if  (randomNum10 == 3 ) {
		T.get('search/tweets', surfSearch, function (error, data) {
			console.log(error, data);

			if (!error) {
				var favoriteId = data.statuses[randomNum11].id_str;

				T.post('favorites/create', { id: favoriteId }, function (error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have favorited something.')
				}
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			})
		  }
		  else {
		  	console.log('There was an error with your hashtag search:', error);
		  }
		});
	}

}

//////////////////////////////////Code used from example bot////////////////////////////////////////////////

function retweet() {
	var randomNum8 = Math.floor((Math.random() * 3) + 1);
	var randomNum9 = Math.floor((Math.random() * 10) + 1);
	if (randomNum8 == 1) {
		T.get('search/tweets', broSearch, function (error, data) {
		  // log out any errors and responses
		  console.log(error, data);
		  // If our search request to the server had no errors...
		  if (!error) { 
		  	// ...then we grab the ID of the tweet we want to retweet...
			var retweetId = data.statuses[randomNum9].id_str;
			// ...and then we tell Twitter we want to retweet it!
			T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have retweeted something.')
				}
				// If there was an error with our Twitter call, we print it out here.
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			})
		  }
		  // However, if our original search request had an error, we want to print it out here.
		  else {
		  	console.log('There was an error with your hashtag search:', error);
		  }
		});
    } else if (randomNum8 == 2) {
    	T.get('search/tweets', californiaSearch, function (error, data) {
		  // log out any errors and responses
		  console.log(error, data);
		  // If our search request to the server had no errors...
		  if (!error) { 
		  	// ...then we grab the ID of the tweet we want to retweet...
			var retweetId = data.statuses[randomNum9].id_str;
			// ...and then we tell Twitter we want to retweet it!
			T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have retweeted something.')
				}
				// If there was an error with our Twitter call, we print it out here.
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			})
		  }
		  // However, if our original search request had an error, we want to print it out here.
		  else {
		  	console.log('There was an error with your hashtag search:', error);
		  }
		});
    } else if (randomNum8 == 3) {
    	T.get('search/tweets', surfSearch, function (error, data) {
		  // log out any errors and responses
		  console.log(error, data);
		  // If our search request to the server had no errors...
		  if (!error) { 
		  	// ...then we grab the ID of the tweet we want to retweet...
			var retweetId = data.statuses[randomNum9].id_str;
			// ...and then we tell Twitter we want to retweet it!
			T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have retweeted something.')
				}
				// If there was an error with our Twitter call, we print it out here.
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			})
		  }
		  // However, if our original search request had an error, we want to print it out here.
		  else {
		  	console.log('There was an error with your hashtag search:', error);
		  }
		});
    }
}


tweet();
favorite();
follow();
retweet();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweet, 1000 * 60 * 60);
setInterval(favorite, 1000 * 60 * 25);
setInterval(tweet, 1000 * 60 * 20);
setInterval(follow, 1000* 60 * 45);