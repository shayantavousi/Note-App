const notes = [
    {
        id: 1,
        title: "first note",
        body: "this is first note",
        updated: "2021-10-31T15:03:23.556Z"
    },
    {
        id: 2,
        title: "second note",
        body: "this is second note",
        updated: "2021-10-31T15:02:00.411Z"
    },
    {
        id: 3,
        title: "third note",
        body: "this is third note",
        updated: "2022-07-19T08:25:01.801Z"
    }
]



export default class notesAPI {
    static getAllNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("all-notes")) || [];
        return savedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        })
    }
    static saveNote(newNote) {
        const serverNotes = notesAPI.getAllNotes();
        const existedNote = serverNotes.find(note => note.id == newNote.id);
        if (existedNote) {
            existedNote.title = newNote.title
            existedNote.body = newNote.body
            existedNote.updated = new Date().toISOString();

        }
        else {
            newNote.id = new Date().getTime();
            newNote.updated = new Date().toISOString();
            serverNotes.push(newNote);
        }
        localStorage.setItem("all-notes", JSON.stringify(serverNotes));

    }
    static deleteNote(id) {
        const serverNotes = notesAPI.getAllNotes();
        const filteredNotes = serverNotes.filter(note => id != note.id);
        localStorage.setItem("all-notes", JSON.stringify(filteredNotes))

    }
}

