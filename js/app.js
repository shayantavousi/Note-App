import notesAPI from './notesAPI.js';

import notesView from './notesView.js';

export default class app {
    constructor(root) {
        this.allNotes = [];
        this.activeNote = null;
        this.view = new notesView(root, this._handlers());
        this._refreshNotes();

    }

    _refreshNotes() {

        const savedNotes = notesAPI.getAllNotes(); //server notes
        this.allNotes = savedNotes;  //app notes
        this.view.noteListUpdator(this.allNotes)
        if (this.activeNote) {
            this.view.selectedNoteUpdator(this.activeNote)
        }
    }


    _handlers() {
        return {
            onNoteAdd: () => {
                const newNote = {
                    title: "Note Title",
                    body: "Your Note Here..."
                }
                notesAPI.saveNote(newNote);
                this.activeNote = notesAPI.getAllNotes()[0]
                this._refreshNotes();
                this.view.onLoadPreview(true)
            },
            onNoteEdit: (newNoteTitle, newNoteDetail) => {
                notesAPI.saveNote({
                    id: this.activeNote.id,
                    title: newNoteTitle,
                    body: newNoteDetail
                })

                this.activeNote = notesAPI.getAllNotes()[0]

                this._refreshNotes();

            },
            onNoteSelect: (noteId) => {
                const selectedNote = this.allNotes.find(n => n.id == noteId)
                this.activeNote = selectedNote;
                this._refreshNotes();
                this.view.onLoadPreview(true)
            },
            onNoteDelete: (noteId) => {
                notesAPI.deleteNote(noteId)
                this.activeNote = null
                this._refreshNotes();
                this.view.onLoadPreview(false)
            }
        }
    }

}




