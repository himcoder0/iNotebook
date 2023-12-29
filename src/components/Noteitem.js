import React, { useContext } from "react";
import notesContext from "../context/notes/NoteContext";

export default function Noteitem(props) {
  // using context
  const context = useContext(notesContext);

  // destructuring notes from context and props
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handleDeleteNote = (e) => {
    deleteNote(note._id);
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={handleDeleteNote}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
