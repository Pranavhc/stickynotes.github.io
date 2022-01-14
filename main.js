const notesContainer = document.getElementById("app"); // all notes are contained in ".app" class
const addNoteButton = notesContainer.querySelector(".add-note");

// (this is for notes created already)
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content); //creating a note having previously given values
  notesContainer.insertBefore(noteElement, addNoteButton); //and inserting it before add button
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  //get all previously created notes from saved notes which are stored on local storage
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  //save created notes on local storage
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  // creation of a note.
  const element = document.createElement("textarea"); // added a textarea to the html
  element.classList.add("note"); // created a "note" class / element
  element.value = content; // will get the content from user in the "addNote" function
  element.placeholder =
    "*   Write something here...\n\n1. Double click to delete...\n\n2. Drag bottom-right side to resize note...\n\n3. All your notes are saved here.."; // if content is empty, placeholder will be shown

  // on evrery change this will update the saved note
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  // this will delete the note using
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Do you want to delete this note?");
    if (doDelete) deleteNote(id, element);
  });

  return element;
}

// adding a new note to the list
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000), //for id a random number gets generated
    content: "", //this is the content of the note
  };
  // (this is for newly ceated notes)
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent; // replace previous content with new content
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id); // removes secific note from all notes
  saveNotes(notes); // save the edited list of notes
  notesContainer.removeChild(element); // remove the specific note from the ".app" class
}
