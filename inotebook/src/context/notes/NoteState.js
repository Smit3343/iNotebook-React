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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzZGI1MjUzNWM1MmRiMWI4NTk0MWYwIn0sImlhdCI6MTY0ODIyMzM2Nn0.Jv1ZZ7xg2jlCWl3DZS6At71TYfLCdxQp7bWpuXNste4'
      }
    });
    const notes=await response.json();
    setNotes(notes);
  }
  //Add Note
  const addNote =async (note) => {
    const response = await fetch(`${host}/api/note/addNote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzZGI1MjUzNWM1MmRiMWI4NTk0MWYwIn0sImlhdCI6MTY0ODIyMzM2Nn0.Jv1ZZ7xg2jlCWl3DZS6At71TYfLCdxQp7bWpuXNste4'
      },
      body: JSON.stringify(note)
    });
    const addNote=await response.json();
    setNotes(notes.concat(addNote));
  }
  //Update Note
  const updateNote = async (note) => {
    const response = await fetch(`${host}/api/note/updateNote/${note._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzZGI1MjUzNWM1MmRiMWI4NTk0MWYwIn0sImlhdCI6MTY0ODIyMzM2Nn0.Jv1ZZ7xg2jlCWl3DZS6At71TYfLCdxQp7bWpuXNste4'
      },
      body: JSON.stringify(note)
    });
    let newNotes=JSON.parse(JSON.stringify(notes));
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

  //Delete Note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzZGI1MjUzNWM1MmRiMWI4NTk0MWYwIn0sImlhdCI6MTY0ODIyMzM2Nn0.Jv1ZZ7xg2jlCWl3DZS6At71TYfLCdxQp7bWpuXNste4'
      },
    });
    const newNote = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNote);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote,getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;