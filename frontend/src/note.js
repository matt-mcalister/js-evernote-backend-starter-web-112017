const Note = (() => {
  let id = 0
  return class Note {
    constructor(title,body){
      this.id = ++id;
      this.title = title;
      this.body = body;
    }

    createSidebarDiv(){
      return `<div class="note-summary" data-id=${this.id}><h3>${this.title}</h3><p>${this.body.slice(0,25)}</p></div>`
    }
  }
})()
