import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getAllNotes, updateNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData=async()=> {
        if (localStorage.getItem('authToken') != null) {
            let err=await getAllNotes();
            if(err)
            props.showAlert('danger',err);
        }
        else {
            navigate('/login');
        }
    }
    fetchData();
    }, [getAllNotes,navigate,props])
    const [note, setnote] = useState({
        _id: "",
        etitle: "",
        edescription: "",
        etag: ""
    })
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNoteBtn = (n) => {
        setnote({
            _id: n._id,
            etitle: n.title,
            edescription: n.description,
            etag: n.tag
        })
        ref.current.click();
    }
    const updateButtonClick = () => {
        const newNote = {
            _id: note._id,
            title: note.etitle,
            description: note.edescription,
            tag: note.etag
        }
        updateNote(newNote);
        refClose.current.click();
    }

    const changeState = (e) => {
        setnote({ ...note, [e.target.id]: e.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <AddNote showAlert={props.showAlert} />
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    lunch update modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">title</label>
                                        <input type="text" className="form-control" value={note.etitle} id="etitle" minLength={3} required onChange={changeState} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">description</label>
                                        <textarea rows={3} className="form-control" value={note.edescription} id="edescription" minLength={5} required onChange={changeState}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">tag</label>
                                        <input type="text" className="form-control" value={note.etag} id="etag" onChange={changeState} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={updateButtonClick} className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Your Notes</h3>
                <div className='row'>
                    {notes.length === 0 ? <h6>No Notes to display</h6> : notes.map((note) => {
                        return (
                            <NoteItem key={note._id} note={note} updateNoteBtn={updateNoteBtn} />
                        )
                    })}
                </div>
            </div></div>
    )
}
