

document.addEventListener("DOMContentLoaded", () => {
  let x;
  fetch("http://localhost:3000/api/v1/notes")
    .then( response => {return response.json()} ).then(data => {


// BEGIN RENDERING SIDEBAR
      const storeNotes = {}
      const sidebar = document.getElementById("side-bar")
      // const sidebar = document.getElementById("side-bar")
      let listOfNotes = [];
      for (let element in data) {
        let newNote = new Note(data[element].title, data[element].body);
        storeNotes[data[element].id] = newNote;
        listOfNotes.push(newNote.createSidebarDiv());
      }

      sidebar.innerHTML = listOfNotes.join("");

// click on note summary
    sidebar.addEventListener("click", handleNoteSummary)



// end of fetch block
    })

})
