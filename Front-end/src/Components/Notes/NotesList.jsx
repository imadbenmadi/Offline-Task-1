import React from "react";
import NoteCard from "./Note_Card";
import { useState } from "react";
import Note_PopUp from "./Note_PopUp";
import { AnimatePresence } from "framer-motion";

function NotesList({ Notes, setNotes }) {
    if (!Notes || Notes.length === 0) {
        return (
            <div className="text-center pt-12 text-gray-700 mt-10">
                No Notes Yet!
            </div>
        );
    }
    const [note_popup, setNote_popup] = useState(false);
    const change_note_popup = (note_id) => {
        setNote_popup(note_id);
    };

    return (
        <div className="p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Notes.map((Note) => (
                    <NoteCard
                        key={Note.id}
                        Note={Note}
                        change_note_popup={change_note_popup}
                    />
                ))}
            </ul>
            <AnimatePresence>
                {note_popup && (
                    <div className="min-h-[500px]">
                        <Note_PopUp
                            note_id={note_popup}
                            setNote_popup={setNote_popup}
                            Notes={Notes}
                            setNotes={setNotes}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default NotesList;
