import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';

function YourNotes() {
    const context = useContext(noteContext);
    const { notes, deleteNote, getNotes, } = context;
    useEffect(() => {
        getNotes()
    }, [])
    if (notes.length === 0) {
        return (
            <div className='container'>
                <h2 className="pb-2 border-bottom">No Notes</h2>
                <a className="btn btn-primary" href="/createnote" role="button">Create your first Note</a>
            </div>
        )
    }

    return (

        <main>
            <section className=" text-center container">
                <div className="row py-lg-1">
                    <div className="col-lg-6 col-md-2 mx-auto">
                        <h1 className="fw-light">Your Notes</h1>
                        <p>
                            <a href="/createnote" className="btn btn-primary my-2">New Note</a>
                        </p>
                    </div>
                </div>
            </section>

            <div className="album py-2 ">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {notes.map((note) => {
                            return (
                                <div className="col" key={note._id}>
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h3 className="fs-2 text-body-emphasis">{note.title ? (note.title.length <= 20 ? note.title : (note.title.slice(0, 20) + '...')) : ""}</h3>
                                            <p className='fs-6'>{note.tag ? (note.tag.length <= 20 ? note.tag : (note.tag.slice(0, 20) + '...')) : ""}</p>
                                            <p className='fs-5'>{note.description ? (note.description.length <= 200 ? note.description : (note.description.slice(0, 200) + '...')) : ""}</p>

                                            <div className="btn-group">
                                                
                                                <a href={`/editnote/${note._id}`} className="btn btn-primary" tabIndex="-1" role="button" >Open<i className="fa-solid fa-folder-open mx-1"></i></a>
                                                <a href={`/editnote/${note._id}`} className="btn btn-secondary" tabIndex="-1" role="button" ><i className="fa-regular fa-pen-to-square " ></i></a>
                                                <a className="btn btn-secondary" tabIndex="-1" role="button" ><i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id) }}></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}




                    </div>
                </div>
            </div>

        </main>

    )
}

export default YourNotes
