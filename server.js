// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================

var app = express();
var PORT = 8000;

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes
// =============================================================

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Dispay with API/ 

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


// Create new POST 
app.post("/api/notes", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("/db/db.json"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync(/db/db.JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.JSON(savedNotes);
})


// Starts the server to begin listening
// =============================================================

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});