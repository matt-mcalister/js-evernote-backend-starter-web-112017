class App {
  constructor(){
    this.sideBar = document.querySelector('.notes-preview')
    this.newNote = document.querySelector('#new-note');
    this.mainContent = document.querySelector('.content')
    this.toolbar = document.querySelector('.toolbar')
    this.fetchFromBackEnd()
  }

  fetchFromBackEnd(){
    fetch("http://localhost:3000/api/v1/notes")
    .then(response => response.json())
    .then(notes => {
      // render sidebar notes
      for (const note of notes) {
        let newNote = new Note({title: note.title, body: note.body, id: note.id});
        store.notes[newNote.id] = newNote;
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
      store.notes[event.target.parentElement.id].showFullNote();
    } else {
      store.notes[event.target.id].showFullNote();
    }
  }


  handleNewNote(event) {
    // clear main content div and toolbar div
    this.mainContent.innerHTML = '';
    this.toolbar.innerHTML = ''

    // create form element
    this.createNewNoteForm();
    mainContent.append(this.noteForm);

    noteForm.addEventListener('submit', this.handleNewNoteSubmission)
  }

  createNewNoteForm(){
    this.noteForm = document.createElement('form')
    this.noteForm.id = 'note-form'

    this.noteTitle = document.createElement('input')
    this.noteTitle.type = 'text'
    this.noteTitle.placeholder = 'Title'

    this.noteBody = document.createElement('textarea')
    this.noteBody.placeholder = 'Description'

    let submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Create Note'

    noteForm.append(this.noteTitle)
    noteForm.append(this.noteBody)
    noteForm.append(submit)
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
        note.showFullNote();
      })
  }

}
