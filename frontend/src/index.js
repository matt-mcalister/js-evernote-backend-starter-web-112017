const store = {notes: {}}

document.addEventListener('DOMContentLoaded', () => {
  const sideBar = document.querySelector('#side-bar')

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
      new Note(note.title, note.body, note.id).createSidebarDiv()
    }




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
