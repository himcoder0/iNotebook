import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API Call
    const url = "http://localhost:5000/api/notes/fetchallnotes/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YzE3YmRmMzE2YjY5NTFiNWFkYjgzIn0sImlhdCI6MTcwMzY4MjU5NX0.MeNRmMiMGYgNAEoVXtJibGXGPT3SMh6JrpcYppMuj0I",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YzE3YmRmMzE2YjY5NTFiNWFkYjgzIn0sImlhdCI6MTcwMzY4MjU5NX0.MeNRmMiMGYgNAEoVXtJibGXGPT3SMh6JrpcYppMuj0I",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = [
      {
        _id: "658c591e95433fa84f348d7e7137",
        user: "658c17bdf316b6951b5adb83",
        title: title,
        description: description,
        tag: tag,
        date: "2023-11-27T17:04:30.537Z",
        __v: 0,
      },
    ];
    setNotes(notes.concat(note));
    console.log("Added the note");
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YzE3YmRmMzE2YjY5NTFiNWFkYjgzIn0sImlhdCI6MTcwMzY4MjU5NX0.MeNRmMiMGYgNAEoVXtJibGXGPT3SMh6JrpcYppMuj0I",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // Edit on client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // Delete a note
  const deleteNote = async (id, title, description, tag) => {
    // API Call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YzE3YmRmMzE2YjY5NTFiNWFkYjgzIn0sImlhdCI6MTcwMzY4MjU5NX0.MeNRmMiMGYgNAEoVXtJibGXGPT3SMh6JrpcYppMuj0I",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // client side deletion
    console.log("Deleting the node with id :" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
