import React, { useState, useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

function Editnotes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, editNote, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, []);

    const [note, setNote] = useState({});

    useEffect(() => {
        const foundNote = notes.find(note => note._id === id);
        if (foundNote) {
            setNote({
                title: foundNote.title,
                description: foundNote.description,
                tag: foundNote.tag
            });
        }
    }, [notes, id]);

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const save = async (e) => {
        e.preventDefault();
        await editNote(id, note.title, note.description, note.tag);
        navigate('/'); // Redirect to the home page or wherever appropriate
    };

    return (
        <div className='container w-75'>
            <form onSubmit={save}>
                <div className="my-1">
                    <input
                        onChange={onChange}
                        type="text"
                        className="form-control fs-5"
                        name="title"
                        value={note.title || ''}
                        placeholder="Title"
                    />
                </div>
                <div className="my-1">
                    <input
                        onChange={onChange}
                        type="text"
                        className="form-control fs-5"
                        name="tag"
                        value={note.tag || ''}
                        placeholder="Tag"
                    />
                </div>
                <div className="mb-1">
                    <textarea
                        onChange={onChange}
                        className="form-control"
                        name="description"
                        value={note.description || ''}
                        rows="20"
                    ></textarea>
                </div>
                <button type="submit" className="btn bg-light">Save</button>
            </form>
        </div>
    );
}

export default Editnotes;
