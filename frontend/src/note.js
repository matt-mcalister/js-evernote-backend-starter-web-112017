class Note {
    constructor({title, body, id}){
      this.id = id;
      this.title = title;
      this.body = body;
      store.notes[this.id] = this
    }


    createSidebarDiv(){
      let noteWrapper = document.createElement('div')
      noteWrapper.id = this.id;
      noteWrapper.className = 'note-summary';

      let noteTitle = document.createElement('h3')
      noteTitle.innerHTML = this.title.slice(0, 40);

      let noteBody = document.createElement('p')
      noteBody.innerHTML = `${this.body.slice(0, 100)} <br>`

      store.app.sideBar.prepend(noteWrapper)
      noteWrapper.append(noteTitle)
      noteWrapper.append(noteBody)
    }

    createButtons(){
      // let editNote = document.createElement('button')
      // editNote.className = 'tool-button'
      // editNote.innerText = 'Edit'
      // editNote.value = this.id
      //
      // editNote.addEventListener('click', this.edit.bind(this))

      let deleteNote = document.createElement('button')
      deleteNote.className = 'tool-button'
      deleteNote.innerText = 'Delete'
      deleteNote.value = this.id

      deleteNote.addEventListener('click', this.delete.bind(this))

      // store.app.toolbar.append(editNote)
      store.app.toolbar.append(deleteNote)
    }

    showFullNote(){
      store.app.mainContent.innerHTML = ''
      store.app.toolbar.innerHTML = ''

      this.createButtons();
      store.app.mainContent.innerHTML = '';
      store.app.toolbar.innerHTML = ''

      let noteTitle = document.createElement('h1')
      noteTitle.innerHTML = this.title;

      let noteBody = document.createElement('p')
      noteBody.innerHTML = this.body;

      store.app.mainContent.append(noteTitle)
      store.app.mainContent.append(noteBody)
    }

    editSidebarDiv(){
      const sidebarDiv = document.getElementById(`${this.id}`)
      sidebarDiv.firstElementChild.innerText = this.title;
      sidebarDiv.lastElementChild.innerText = this.body;
    }

    edit(event){
      event.preventDefault();
      store.app.mainContent.innerHTML = '';
      store.app.toolbar.innerHTML = ''

      store.app.createUpdateNoteForm(this);

      store.app.noteForm.addEventListener('submit', store.app.handleUpdateNoteSubmission.bind(this))
    }

    delete(event){
      event.preventDefault();

      store.app.mainContent.innerHTML = '';
      store.app.toolbar.innerHTML = ''

      fetch(`http://localhost:3000/api/v1/notes/${this.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      store.notes[this.id] = null;
      document.getElementById(`${this.id}`).remove();
    }


}
