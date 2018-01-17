const Note = (() => {
  return class Note {
    constructor({title, body, id}){
      this.id = id;
      this.title = title;
      this.body = body;
      store.notes[this.id] = this
    }


    createSidebarDiv(){
      const sideBar = document.querySelector('.notes-preview')

      let noteWrapper = document.createElement('div')
      noteWrapper.id = this.id;
      noteWrapper.className = 'note-summary';

      let noteTitle = document.createElement('h3')
      noteTitle.innerHTML = this.title;

      let noteBody = document.createElement('p')
      noteBody.innerHTML = `${this.body.slice(0, 25)} <br>`

      sideBar.prepend(noteWrapper)
      noteWrapper.append(noteTitle)
      noteWrapper.append(noteBody)
    }

    showFullNote(){
      const mainContent = document.querySelector('.content')
      mainContent.innerHTML = ''

      const toolbar = document.querySelector('.toolbar')
      toolbar.innerHTML = ''

      let editNote = document.createElement('button')
      editNote.className = 'tool-button'
      editNote.innerText = 'edit'
      editNote.value = this.id


      editNote.addEventListener('click', this.edit.bind(this))


      let deleteNote = document.createElement('button')
      deleteNote.className = 'tool-button'
      deleteNote.innerText = 'X'
      deleteNote.value = this.id

      deleteNote.addEventListener('click', this.delete.bind(this))

      let noteTitle = document.createElement('h1')
      noteTitle.innerHTML = this.title;

      let noteBody = document.createElement('p')
      noteBody.innerHTML = `${this.body}`


      toolbar.append(editNote)
      toolbar.append(deleteNote)
      mainContent.append(noteTitle)
      mainContent.append(noteBody)
    }

    editSidebarDiv(){
      const sidebarDiv = document.getElementById(`${this.id}`)
      sidebarDiv.firstElementChild.innerText = this.title;
      sidebarDiv.lastElementChild.innerText = this.body;
    }

    edit(event){
      const mainContent = document.querySelector('.content')
      const toolbar = document.querySelector('.toolbar')
      event.preventDefault();
      mainContent.innerHTML = '';
      let noteForm = document.createElement('form')
      noteForm.id = 'note-form'

      toolbar.innerHTML = ''

      let noteTitle = document.createElement('input')
      noteTitle.type = 'text'
      noteTitle.value = this.title

      let noteBody = document.createElement('textarea')
      noteBody.value = this.body

      let submit = document.createElement('input')
      submit.type = 'submit'
      submit.value = 'Update Note'

      noteForm.append(noteTitle)
      noteForm.append(noteBody)
      noteForm.append(submit)
      mainContent.append(noteForm)
      let noteId = this.id
      noteForm.addEventListener('submit', handleFormSubmission)
      function handleFormSubmission(event) {
        event.preventDefault()

        fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            title: noteTitle.value,
            body: noteBody.value
          })
        }).then(response => response.json())
          .then(json => {
            const note = new Note(json)
            store.notes[note.id] = note
            note.editSidebarDiv();
            note.showFullNote();
          })
      } // form sub
    }

    delete(event){
      const mainContent = document.querySelector('.content')
      const toolbar = document.querySelector('.toolbar')
      event.preventDefault();


      mainContent.innerHTML = '';
      toolbar.innerHTML = ''


      let noteId = this.id

      fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
        // body: JSON.stringify({
        //   title: noteTitle.value,
        //   body: noteBody.value
        //
      } )
      // .then(response => response.json())
      //   .then(json => {
      //     const note = new Note(json)
      //     store.notes[note.id] = note
      //     note.editSidebarDiv();
      //     note.showFullNote();
      //   })
      store.notes[this.id] = null;
      document.getElementById(`${this.id}`).remove();
    }


  }
})()
