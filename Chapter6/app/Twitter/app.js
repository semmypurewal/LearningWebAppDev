var express = require("express"),
    http = require("http"),
    tweetCounts = require("./tweet_counter.js"),
    app = express();

app.use(express.static(__dirname + "/client"));

http.createServer(app).listen(3000);

app.get("/counts.json", function (req, res) {
    // res.json returns the entire object as a JSON file
    res.json(tweetCounts);
});
