const Note = (() => {
  return class Note {
    constructor(title, body, id){
      this.id = id;
      this.title = title;
      this.body = body;
      store.notes[this.id] = this
    }

    createSidebarDiv(){
      const sideBar = document.querySelector('#side-bar')

      let noteWrapper = document.createElement('div')
      noteWrapper.id = this.id;
      noteWrapper.className = 'note-summary';

      let noteTitle = document.createElement('h3')
      noteTitle.innerHTML = this.title;

      let noteBody = document.createElement('p')
      noteBody.innerHTML = `${this.body.slice(0, 25)} <br>`

      sideBar.append(noteWrapper)
      noteWrapper.append(noteTitle)
      noteWrapper.append(noteBody)
    }

    showFullNote(){
      const currentNote = document.querySelector('#current-note')
      currentNote.innerHTML = ''
      let noteTitle = document.createElement('h1')
      noteTitle.innerHTML = this.title;

      let noteBody = document.createElement('p')
      noteBody.innerHTML = `${this.body}`

      currentNote.append(noteTitle)
      currentNote.append(noteBody)
    }
  }
})()
