var ntwitter = require("ntwitter"),
    redis = require("redis"), // require the redis module
    credentials = require("./credentials.json"),
    redisClient,
    counts = {},
    twitter,
    services,
    redisCredentials;


// create our twitter client
twitter = ntwitter(credentials);

// set up our services
if (process.env.VCAP_SERVICES) {
    services = JSON.parse(process.env.VCAP_SERVICES);
    redisCredentials = services["rediscloud"][0].credentials;
} else {
    redisCredentials = {
	"hostname": "127.0.0.1",
	"port": "6379",
	"password": null
    };
}

// create a client to connect to Redis
client = redis.createClient(redisCredentials.port, redisCredentials.hostname);
client.auth(redisCredentials.password, function (response) {
    console.log(response);
});

// initialize to zero

client.get("awesome", function (err, awesomeCount) {
    if (err !== null) {
	//handle error
    }

    // initialize our counter to the integer version
    // of the value stored in Redis, or 0 if it's not
    // set
    counts.awesome = parseInt(awesomeCount,10) || 0;

    twitter.stream(
	"statuses/filter",
	{ track: ["awesome", "cool", "rad", "gnarly", "groovy"] },
	function(stream) {
            stream.on("data", function(tweet) {
		if (tweet.text.indexOf("awesome") >= -1) {
                    // increment the key on the client
                    client.incr("awesome");

                    counts.awesome = counts.awesome + 1;
		}
            });
	}
    );
});

module.exports = counts;

