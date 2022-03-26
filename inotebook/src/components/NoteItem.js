import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNoteBtn } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i onClick={()=>updateNoteBtn(note)} className="fa-solid fa-pen-to-square"></i>
                    <i onClick={()=>deleteNote(note._id)} className="fa-solid fa-trash-can mx-3"></i>
                </div>
            </div>
        </div>
    )
}
