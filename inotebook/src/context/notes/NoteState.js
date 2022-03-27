import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const notesInit = []
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(notesInit)

  const getAllNotes = async () => {

    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('authToken')
      }
    });
    const resJson = await response.json();
    if (response.ok) {
      setNotes(resJson);
    }
    else {
      return resJson.error;
    }
  }
  //Add Note
  const addNote = async (note) => {
    const response = await fetch(`${host}/api/note/addNote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
      body: JSON.stringify(note)
    });
    const resJson = await response.json();
    if (response.ok) {
      setNotes(notes.concat(addNote));
    }
    else {
      return resJson.error;
    }
  }
  //Update Note
  const updateNote = async (note) => {
    const response = await fetch(`${host}/api/note/updateNote/${note._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
      body: JSON.stringify(note)
    });
    if (response.ok) {
      let newNotes = JSON.parse(JSON.stringify(notes));
      //Logic for update note in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === note._id) {
          newNotes[index].title = note.title;
          newNotes[index].description = note.description;
          newNotes[index].tag = note.tag;

          break;
        }

      }
      setNotes(newNotes);
    }
    else {
      const resJson = await response.json();
      return resJson.error;
    }
  }

  //Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
    });
    if (response.ok) {
      const newNote = notes.filter((note) => {
        return note._id !== id;
      })
      setNotes(newNote);
    }
    else {
      const resJson = await response.json();
      return resJson.error;
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;