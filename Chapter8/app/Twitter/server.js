var http = require('http');
var twitter = require('./twitter.js');

http.createServer(function (req, res) {
    var word;

    res.writeHead(200, {'Content-Type': 'text/plain'});
    for (word in twitter) {
        res.write(word + ": " + twitter[word] + "\n");
        //console.log(word + ": " + twitter[word]);
    }

    res.end();
}).listen(process.env.PORT || 3000);

