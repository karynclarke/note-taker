const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(function(notes) {
            let readNotes = [];

            try {
                readNotes = readNotes.concat(JSON.parse(notes))
            } catch (error) {
                readNotes = [];
            }

            return readNotes;

        })
    }
    addNote(note) {
        const { title, text } = note;
        var id = 100

        if (!title || !text) {
            throw new Error("no blank notes")
        }

        const newNote = {
            title: title,
            text: text,
            id: id++
        }

        return this.getNotes().then((notes) => [...notes, newNote]).then((updatedNotes) => this.write(updatedNotes)).then(() => newNote);
    }

    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== parseInt(id))).then(filteredNotes => {
                console.log('filtered notes are: ', filteredNotes);
                this.write(filteredNotes)
            });
    }
}
module.exports = new Note();