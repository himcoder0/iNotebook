import React, { useContext, useState } from "react";
import notesContext from "../context/notes/NoteContext";

export default function Addnote() {
  // using context
  const context = useContext(notesContext);
  // destructuring notes from context
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // e: event
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  return (
    <>
      <div className="container my-3">
        <h2>Add a note</h2>
        <div className="container my-3">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleAddNote}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
}