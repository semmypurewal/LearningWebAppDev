var express = require("express"),
    http = require("http"),
    app = express(),
    port = process.env.PORT || 3000;;


http.createServer(app).listen(port);
console.log("Express is listening on port " + port);

app.get("/hello", function (req, res) {
    res.send("Hello World!");
});

app.get("/goodbye", function (req, res) {
    res.send("Goodbye World!");
});
