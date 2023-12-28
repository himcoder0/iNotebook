import React, { useContext, useEffect } from "react";
import notesContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

export default function Notes() {
  // using context
  const context = useContext(notesContext);

  // destructuring notes from context
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h3>Your notes</h3>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}
