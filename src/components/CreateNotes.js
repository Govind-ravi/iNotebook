import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';


function CreateNotes() {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) //as we change the value gets pushed
    }
    const save = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        navigate('/')
    }

    return (
        <div className='container w-75 '>
            <form>
                <div className="my-1">
                    <input onChange={onChange} type="text" className="form-control fs-5 my-1" id="title" name="title" placeholder="Title" style={{border:0,outline:0}} pattern=".{5,}" />
                </div>
                <div className="my-1">
                    <input onChange={onChange} type="text" className="form-control fs-5" id="tag" name="tag" placeholder="Tag" style={{border:0,outline:0}} />
                </div>
                <div className="mb-1">
                    <textarea onChange={onChange} className="form-control" id="description" name="description" placeholder="description" rows="20" style={{border:0,outline:0}}></textarea>
                </div>
                <a href={`/editnote/${note._id}`} type="submit" className="btn btn-primary" tabIndex="-1" role="button"onClick={save} >Save</a>
                
            </form> 
        </div>
    )
}

export default CreateNotes
