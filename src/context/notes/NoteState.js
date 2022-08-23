import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes  
    const getnotes = async () => {

        // const jwt = localStorage.getItem('token')

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("token")),
              
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQwNjYyZTZmNjFmZmVmY2E1NzRkIn0sImlhdCI6MTY0NzA2NzI2M30.uezmBiRR8TDBBQ0OHXsHucznQXB6KQe5sQhrnzMfPRI"

            },
        });
        const json = await response.json();
        setNotes(json)
        // console.log(json)

    };

    // // Add note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":JSON.parse(localStorage.getItem("token"))
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQwNjYyZTZmNjFmZmVmY2E1NzRkIn0sImlhdCI6MTY0NzA2NzI2M30.uezmBiRR8TDBBQ0OHXsHucznQXB6KQe5sQhrnzMfPRI"

            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        setNotes(notes.concat(note));

    };

    // delete note
    const deleteNote = async (id) => {
        // api call for delete note 
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQwNjYyZTZmNjFmZmVmY2E1NzRkIn0sImlhdCI6MTY0NzA2NzI2M30.uezmBiRR8TDBBQ0OHXsHucznQXB6KQe5sQhrnzMfPRI"
                "auth-token":JSON.parse(localStorage.getItem("token"))

            },

        });
        const json =await response.json();
        console.log(json)

        // logic to delete  notes 
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    // // Edit note
    const editNote = async (id, title, description, tag) => {


        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQwNjYyZTZmNjFmZmVmY2E1NzRkIn0sImlhdCI6MTY0NzA2NzI2M30.uezmBiRR8TDBBQ0OHXsHucznQXB6KQe5sQhrnzMfPRI"
                "auth-token":JSON.parse(localStorage.getItem("token"))
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))

        // logic to edit note in client

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];

            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        console.log(id, notes)

        setNotes(newNotes)
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};
export default NoteState;
