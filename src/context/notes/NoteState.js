import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    try {
      const url = `${host}/api/notes/fetchallnotes/`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YzE3YmRmMzE2YjY5NTFiNWFkYjgzIn0sImlhdCI6MTcwMzY4MjU5NX0.MeNRmMiMGYgNAEoVXtJibGXGPT3SMh6JrpcYppMuj0I",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // // Add a note
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
    const note = await response.json();
    setNotes(notes.concat(note));
    console.log(note);
    console.log("Added the note");
  };

  // // Edit a note
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
    const json = await response.json();
    console.log(json);
    // create a deep copy of notes;
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Edit on client siden
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // // Delete a note
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
    });
    const json = await response.json();
    console.log(json);
    // client side deletion
    console.log("Deleting the node with id: " + id);
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
