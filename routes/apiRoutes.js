const Note = require("../db/Note");
const router = require("express").Router();


router.get("/notes", function(req, res) {
    Note.getNotes()
        .then((notes) => res.send(notes))
        .catch((err) => res.status(500).json(err))
});
router.post("/notes", function(req, res) {
    Note.addNote(req.body)
        .then((note) => res.json(note)).catch((err) => res.status(500).json(err))
});
router.delete("/notes/:id", function(req, res) {
    Note.deleteNote(req.params.id).then(() => res.json({
        ok: true
    })).catch((err) => res.status(500).json(err))
});

module.exports = router;