var http = require("http"),
    // if the environment port is set up,
    // listen on that one, otherwise listen
    // on port 3000
    port = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World!\n");
});

server.listen(port);

console.log("Server listening on port " + 3000);
