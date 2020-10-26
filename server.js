// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const notesArr = require("./db/db.json");



// Sets up the Express App
// =============================================================

const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// HTML Routes
// =============================================================

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function (req, res) {
    res.json(notesArr);
})

app.post("/api/notes", function (req, res) {
    const addNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }
    notesArr.push(addNote);
    res.json(notesArr);
});
// app.delete("/api/notes/:id", function (req, res) {
//     let noteId = req.params.id;

//     for (let i = 0; i < notesArr.length; i++) {
//         if (noteId === notesArr[i].id) {
//             notesArr.splice(i, 1);
//             res.json(notesArr);
//         };
//     };
// });

app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;

    for (let i = 0; i < notesArr.length; i++) {
        if (noteId == notesArr[i].id) {
            notesArr.splice(i, 1);
            res.json(notesArr);
        };
    };
});


// Starts the server to begin listening
// =============================================================

app.listen(PORT, () => {
    console.log("App is listening on PORT: " + PORT);
});