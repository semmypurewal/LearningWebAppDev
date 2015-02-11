var test = require("tape").test;

var PORT = 6379;
var HOST = '127.0.0.1';
var DBNUM = 15;


var redis = require("../");

// Running with a truty argument will enable the wire protocol and other debug logging.
redis.debug_mode = process.argv[2];

var client;

test("connect", function (t) {
    client = redis.createClient(PORT, HOST);
    t.end();
});

test("flushdb", function (t) {
    // Flushes the db between runs
    t.end();
});

test("info", function (t) {
    t.end();
});

test("get", function (t) {
    // 
    t.end();
});

test("quit", function (t) {
    client.quit(function (err, reply) {
        t.notOk(err, "No error");
        t.equals(reply, "OK", "Quit successful")
        t.end();
    });
});