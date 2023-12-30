import React, { useContext, useState } from "react";
import notesContext from "../context/notes/NoteContext";

export default function Addnote(props) {
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
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };

  const checkNote = () => {
    return note.title.length < 3 || note.description.length < 5;
  };

  return (
    <>
      <div className="container my-3">
        <div className="container my-3">
          <h2>Add a note</h2>
        </div>
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
                value={note.title}
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
                value={note.description}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                onChange={onChange}
                value={note.tag}
              />
            </div>
            <button
              disabled={checkNote()}
              type="submit"
              className="btn btn-primary"
              onClick={handleAddNote}
            >
              Add Note
            </button>
          </form>
        </div>
        <hr />
      </div>
    </>
  );
}
