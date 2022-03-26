import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const addNoteButton=(e)=>{
        e.preventDefault();
        addNote(note);
    }
    const [note, setnote] = useState({
        title:"",
        description:"",
        tag:"general"
    })
    const changeState=(e)=>{
        setnote({...note,[e.target.id]:e.target.value})
    }
    return (
        <>
            <h2>Add a note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" onChange={changeState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <textarea rows={3} className="form-control" id="description" onChange={changeState}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" onChange={changeState} />
                </div>
                <button type="submit" onClick={addNoteButton} className="btn btn-primary">Add</button>
            </form>
        </>
    )
}
