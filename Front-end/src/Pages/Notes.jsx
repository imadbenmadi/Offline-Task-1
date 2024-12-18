import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import NotesList from "../Components/Notes/NotesList";
import Input from "../Components/Notes/Input";
function Notes() {
    const [Notes, setNotes] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/Notes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.status === "success") {
                    setNotes(data.data.Notes);
                }
            });
    }, []);

    return (
        <div className=" relative h-screen flex flex-col">
            <NotesList Notes={Notes} />
            <div className=" fixed bottom-0 ">
                <Input />
            </div>
        </div>
    );
}

export default Notes;
