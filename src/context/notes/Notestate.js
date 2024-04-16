import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmY2JiOTdkMDBmOTQzMTA1YzVlYmU3In0sImlhdCI6MTcxMTA2MTkxMX0.8GdeuYbBWAGuKDmZLlG44b5XKxGDvk9AvQtj7HKgNYQ"
            }
          });
          const json = await response.json();
          setNotes(json)
    }

    //Add Note    
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/createnotes`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmY2JiOTdkMDBmOTQzMTA1YzVlYmU3In0sImlhdCI6MTcxMTA2MTkxMX0.8GdeuYbBWAGuKDmZLlG44b5XKxGDvk9AvQtj7HKgNYQ"
            },
            body: JSON.stringify({title, description, tag})
          });

        const note = {
            "user": "65fcbb97d00f943105c5ebe7",
            "title": title,
            "description": description,
            "tag": tag,
            "_id": "65feae7f96bb9d0f7cec59",
            "date": "2024-03-23T10:27:11.183Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmY2JiOTdkMDBmOTQzMTA1YzVlYmU3In0sImlhdCI6MTcxMTA2MTkxMX0.8GdeuYbBWAGuKDmZLlG44b5XKxGDvk9AvQtj7HKgNYQ"
            },
            body: JSON.stringify({title, description, tag})
          });
          let json = response.json();
        console.log(json);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id === id){
                element.title = title
                element.description = description
                element.tag = tag
            }
        }
    }

    //Delete Note
    const deleteNote = async (id) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this note?");
      if(isConfirmed){
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmY2JiOTdkMDBmOTQzMTA1YzVlYmU3In0sImlhdCI6MTcxMTA2MTkxMX0.8GdeuYbBWAGuKDmZLlG44b5XKxGDvk9AvQtj7HKgNYQ"
            }
          });
          let json = response.json();
        const newNote = notes.filter((note)=>{return note._id !== id})
        setNotes(newNote)
      }
      else{
        
      }
    }


    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;