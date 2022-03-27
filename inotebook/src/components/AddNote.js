import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [isError, setisError] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const addNoteButton =async (e) => {
        e.preventDefault();
        let err=await addNote(note);
        if(err!=null)
        {
            props.showAlert("danger",err);
        }
        setnote({
            title: "",
            description: "",
            tag: ""
        })
    }
    const [note, setnote] = useState({
        title: "",
        description: "",
        tag: ""
    })
    const formValid = () => {
        let isValid = false;
        for (let err of Object.values(isError)) {
            if (err.length > 0) {
                isValid = false;
                return isValid;
            }
            else
                isValid = true;
        }

        if (isValid) {
            for (let us of Object.values(note)) {
                if (us.length === 0) {
                    isValid = false;
                    return isValid;
                }
                else
                    isValid = true;
            }
        }
        return isValid;
    }
    const changeState = (e) => {
        const { id, value } = e.target;
        setnote({ ...note, [id]: value })
        let isErr = { ...isError };
        switch (id) {
            case "title":
                isErr.title = value.length < 3
                    ? "title must have aleast 3 character"
                    : "";
                break;
            case "description":
                isErr.description = value.length < 5
                    ? "description must have aleast 5 character"
                    : "";
                break;
            case "tag":
                isErr.tag = value.length === 0
                    ? "tag is required"
                    : "";
                break;
            default:
                break;
        }
        setisError(isErr);
    }
    return (
        <>
            <h2>Add a note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" value={note.title} id="title" onChange={changeState} />
                    {isError.title.length > 0 && <span className="invalid-feedback d-block">{isError.title}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <textarea rows={3} className="form-control" value={note.description} id="description" onChange={changeState}></textarea>
                    {isError.description.length > 0 && <span className="invalid-feedback d-block">{isError.description}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" value={note.tag} id="tag" onChange={changeState} />
                    {isError.tag.length > 0 && <span className="invalid-feedback d-block">{isError.tag}</span>}
                </div>
                <button type="submit" disabled={!formValid()} onClick={addNoteButton} className="btn btn-primary">Add</button>
            </form>
        </>
    )
}
