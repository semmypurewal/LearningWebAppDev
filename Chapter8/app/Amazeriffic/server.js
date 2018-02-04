var express = require("express"),
    http = require("http"),
    // import the mongoose library
    mongoose = require("mongoose"),
    app = express(),
    services,
    mongoUrl = "mongodb://localhost/amazeriffic";

app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

if (process.env.VCAP_SERVICES) {
    services = JSON.parse(process.env.VCAP_SERVICES);
    mongoUrl = services["mlab"][0].credentials.uri;
    console.log(process.env.VCAP_SERVICES);
}

console.log(mongoUrl);

// connect to the amazeriffic data store in mongo
mongoose.connect(mongoUrl);

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

http.createServer(app).listen(process.env.PORT || 3000);

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
	res.json(toDos);
    });
});

app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    newToDo.save(function (err, result) {
	if (err !== null) {
	    // the element did not get saved!
	    console.log(err);
	    res.send("ERROR");
	} else {
	    // our client expects *all* of the todo items to be returned, so we'll do
	    // an additional request to maintain compatibility
	    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    res.send("ERROR");
		}
		res.json(result);
	    });
	}
    });
});
