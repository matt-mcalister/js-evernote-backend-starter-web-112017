const store = {notes: {}}

document.addEventListener('DOMContentLoaded', () => {
  const sideBar = document.querySelector('.notes-preview')
  const newNote = document.querySelector('#new-note');
  const mainContent = document.querySelector('.content')
  const toolbar = document.querySelector('.toolbar')


  fetch("http://localhost:3000/api/v1/notes")
  .then(response => response.json())
  .then(notes => {

    sideBar.addEventListener('click', handleShowFullNote)
    function handleShowFullNote(event){
      if (event.target.nodeName === "P" || event.target.nodeName === "H3") {
        store.notes[event.target.parentElement.id].showFullNote();
      } else {
        store.notes[event.target.id].showFullNote();
      }
    }

    for (const note of notes) {
      new Note({title: note.title, body: note.body, id: note.id}).createSidebarDiv()
    }

    newNote.addEventListener('click', handleNewNote)
    function handleNewNote() {
      mainContent.innerHTML = '';
      let noteForm = document.createElement('form')
      noteForm.id = 'note-form'

      const toolbar = document.querySelector('.toolbar')
      toolbar.innerHTML = ''

      let noteTitle = document.createElement('input')
      noteTitle.type = 'text'
      noteTitle.placeholder = 'Title'

      let noteBody = document.createElement('textarea')
      noteBody.placeholder = 'Description'

      let submit = document.createElement('input')
      submit.type = 'submit'
      submit.value = 'Create Note'

      noteForm.append(noteTitle)
      noteForm.append(noteBody)
      noteForm.append(submit)
      mainContent.append(noteForm)

      noteForm.addEventListener('submit', handleFormSubmission)
      function handleFormSubmission(event) {
        event.preventDefault()

        fetch('http://localhost:3000/api/v1/notes', {
          method: "POST",
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
            note.createSidebarDiv();
            note.showFullNote();
          })
      } // handle submit
    }// handle new note




  });
})



// document.addEventListener("DOMContentLoaded", () => {
//   let x;
//   fetch("http://localhost:3000/api/v1/notes")
//     .then( response => {return response.json()} ).then(data => {
//
//
// // BEGIN RENDERING SIDEBAR
//       const storeNotes = {}
//       const sidebar = document.getElementById("side-bar")
//       // const sidebar = document.getElementById("side-bar")
//       let listOfNotes = [];
//       for (let element in data) {
//         let newNote = new Note(data[element].title, data[element].body);
//         storeNotes[data[element].id] = newNote;
//         listOfNotes.push(newNote.createSidebarDiv());
//       }
//
//       sidebar.innerHTML = listOfNotes.join("");
//
// // click on note summary
//     sidebar.addEventListener("click", handleNoteSummary)
//
//
//
// // end of fetch block
//     })
//
// })
