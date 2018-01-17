class App {
  constructor(){
    this.sideBar = document.querySelector('.notes-preview')
    this.newNote = document.querySelector('#new-note');
    this.mainContent = document.querySelector('.content')
    this.toolbar = document.querySelector('.toolbar')
    store.app = this
    this.fetchFromBackEnd()
  }

  fetchFromBackEnd(){
    fetch("http://localhost:3000/api/v1/notes")
    .then(response => response.json())
    .then(notes => {
      // render sidebar notes
      for (const note of notes) {
        let newNote = new Note({title: note.title, body: note.body, id: note.id});
        newNote.createSidebarDiv()
      }

      // sidebar eventlistener (show note)
      this.sideBar.addEventListener('click', this.handleShowFullNote.bind(this));

      // new note button listener
      this.newNote.addEventListener('click', this.handleNewNote.bind(this));
    })
  }

  handleShowFullNote(event){
    if (event.target.nodeName === "P" || event.target.nodeName === "H3") {
      this.createUpdateNoteForm(store.notes[event.target.parentElement.id]);
    } else {
      this.createUpdateNoteForm(store.notes[event.target.id]);
    }
  }


  handleNewNote(event) {
    // clear main content div and toolbar div
    this.mainContent.innerHTML = '';
    this.toolbar.innerHTML = ''

    // create form element
    this.createNewNoteForm();
    this.mainContent.append(this.noteForm);

    this.noteForm.addEventListener('submit', this.handleNewNoteSubmission.bind(this))
  }

  createNewNoteForm(){
    this.noteForm = document.createElement('form')
    this.noteForm.id = 'note-form'

    this.noteTitle = document.createElement('input')
    this.noteTitle.type = 'text'
    this.noteTitle.placeholder = 'Title'

    this.noteBody = document.createElement('textarea')
    this.noteBody.placeholder = 'Description'
    // this.noteBody.rows = 50;

    let submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Create Note'

    this.noteForm.append(this.noteTitle)
    this.noteForm.append(this.noteBody)
    this.noteForm.append(submit)
  }

  handleNewNoteSubmission(event) {
    event.preventDefault()

    fetch('http://localhost:3000/api/v1/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: this.noteTitle.value,
        body: this.noteBody.value
      })
    }).then(response => response.json())
      .then(json => {
        const note = new Note(json)
        note.createSidebarDiv();
        store.app.createUpdateNoteForm(note);
      })
  }

  createUpdateNoteForm(note){
    store.app.mainContent.innerHTML = '';
    store.app.toolbar.innerHTML = ''
    this.noteForm = document.createElement('form')
    this.noteForm.id = 'note-form'

    this.noteTitle = document.createElement('input')
    this.noteTitle.type = 'text'
    this.noteTitle.value = note.title
    this.noteTitle.classname = 'note-title'

    this.noteBody = document.createElement('textarea')
    this.noteBody.value = note.body
    // this.noteBody.rows = ;

    let submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Save Changes'

    this.noteForm.append(this.noteTitle)
    this.noteForm.append(this.noteBody)
    this.noteForm.append(submit)
    this.mainContent.append(this.noteForm)
    note.createButtons();

    this.noteForm.addEventListener('submit', this.handleUpdateNoteSubmission.bind(note))
  }

  handleUpdateNoteSubmission(event) {
    event.preventDefault()

    fetch(`http://localhost:3000/api/v1/notes/${this.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: store.app.noteTitle.value,
        body: store.app.noteBody.value
      })
    }).then(response => response.json())
      .then(json => {
        const note = new Note(json)
        store.notes[note.id] = note
        note.editSidebarDiv();
        store.app.createUpdateNoteForm(note);
      })
  }

}
