var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [
        { 
            "description" : "Get groceries",
            "tags"  : [ "shopping", "chores" ]
        },
        { 
            "description" : "Make up some new ToDos",
            "tags"  : [ "writing", "work" ]
        },
        {
            "description" : "Prep for Monday's class",
            "tags"  : [ "work", "teaching" ]
        },
        { 
            "description" : "Answer emails",
            "tags"  : [ "work" ]
        },
        { 
            "description" : "Take Gracie to the park",
            "tags"  : [ "chores", "pets" ]
        },
        { 
            "description" : "Finish writing this book",
            "tags"  : [ "writing", "work" ]
        }
    ]
        
app.use(express.static(__dirname + "/client"));

// tell Express to parse incoming
// JSON objects
//app.use(express.urlencoded()); It's not more useful on Express 4.x

/*If you have been installed the last version of Express, some like this version 4.x, try this:
- Before you use below lines, it's necessary to install a middleware body-parsing. 
-- You can see more about middleware body-parsing here:
----ExpressJS: http://expressjs.com/4x/api.html 
----GitHub: https://github.com/senchalabs/connect#middleware
If you choose body-parser like middleware body-parsing this lines must can be useful: */
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// See more here: http://expressjs.com/4x/api.html#req.body

http.createServer(app).listen(3000);

// This route takes the place of our
// todos.json file in our example from
// Chapter 5
app.get("/todos.json", function (req, res) {
    res.json(toDos);
});

app.post("/todos", function (req, res) {
    // the object is now stored in req.body
    var newToDo = req.body;

    console.log(newToDo);

    toDos.push(newToDo);

    // send back a simple object
    res.json({"message":"You posted to the server!"});
});
