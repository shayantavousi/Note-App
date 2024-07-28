export default class notesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `<nav class="sidebar">
        <div class="app__name">دفرچه یادداشت</div>
        <div class="notes__container">
          <ul class="note__list"></ul>
        </div>
        <button class="add__note">
          <span class="icon__container">
            <i class="fa-solid fa-notes-medical"></i>
          </span>
        </button>
      </nav>
      <div class="main__content">
        <input type="text" class="note__title" placeholder="عنوان یادداشت" />
        <textarea
          name=""
          class="note__detail"
          placeholder="متن دلخواه"
        ></textarea>
      </div>
      `;


    const addNoteBtn = this.root.querySelector(".add__note");
    const noteTitle = this.root.querySelector(".note__title");
    const noteDetail = this.root.querySelector(".note__detail");
    const noteContent = [noteTitle, noteDetail];

    addNoteBtn.addEventListener("click", () => {
      // add note method
      this.onNoteAdd();
    })
    noteContent.forEach((input) => {
      input.addEventListener("blur", () => {
        const newNoteTitle = noteTitle.value.trim();
        const newNoteDetail = noteDetail.value.trim();
        this.onNoteEdit(newNoteTitle, newNoteDetail);
      });
    });

    // hide main content

    this.onLoadPreview(false)
  };


  _noteContentCreator(id, title, body, updated) {
    const maxBodyLength = 100;
    return `            
    <li class="note__list-item" data-note-id="${id}">
    <div class="side__note-header">
    <h3 class="side__note-title">${title}</h3>
    <span class="side__note-delete" data-note-id="${id}">
    <i class="fa-regular fa-trash-can"></i>
    </span>
    </div>
    <div class="side__note-detail">
    ${body.substring(0, maxBodyLength)}
    ${body.lenght > maxBodyLength ? "..." : ""}</div>
    <div class="side__note-date">
        ${new Date(updated)
        .toLocaleString("fa-IR", { dateStyle: "full", timeStyle: "short" })}
    </div>
    </li>
`
  };

  noteListUpdator(notes) {
    const noteList = this.root.querySelector(".note__list");
    noteList.innerHTML = "";
    let noteListHTML = "";
    for (const note of notes) {
      const { id, title, body, updated } = note;

      const noteHTML = this._noteContentCreator(id, title, body, updated);
      noteListHTML += noteHTML
    }
    noteList.innerHTML = noteListHTML;
    noteList.querySelectorAll(".note__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      })
    })
    noteList.querySelectorAll(".side__note-delete").forEach((noteItem) => {
      noteItem.addEventListener("click", (e) => {
        e.stopPropagation()
        this.onNoteDelete(noteItem.dataset.noteId)
      })
    })
  }

  selectedNoteUpdator(note) {
    this.root.querySelector(".note__title").value = note.title;
    this.root.querySelector(".note__detail").value = note.body;
    const allNotes = this.root.querySelectorAll(".note__list-item")
    allNotes.forEach((noteItem) => {
      noteItem.classList.remove("selected-note")
    })
    const selectedNote = this.root.querySelector(`.note__list-item[data-note-id="${note.id}"]`)
    selectedNote.classList.add("selected-note")
  }

  onLoadPreview(visible) {
    this.root.querySelector(".main__content").style.visibility = visible ? "visible" : "hidden"
  }
}