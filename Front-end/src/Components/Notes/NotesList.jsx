import React from "react";
import NoteCard from "./Note_Card";
import { useState } from "react";
import Text_Note_PopUp from "./PopUp/Text_Note_PopUp";
import { AnimatePresence } from "framer-motion";
import Voice_Note_PopUp from "./PopUp/Voice_Note_PopUp";
function NotesList({ Notes, setNotes }) {
    if (!Notes || Notes.length === 0) {
        return (
            <div className="text-center pt-12 text-gray-700 mt-10">
                No Notes Yet!
            </div>
        );
    }
    const [text_note_popup, set_text_note_popup] = useState(false);
    const change_text_note_popup = (note_id) => {
        set_text_note_popup(note_id);
    };
    const [Voice_note_popup, set_Voice_note_popup] = useState(false);
    const change_Voice_note_popup = (note_id) => {
        set_Voice_note_popup(note_id);
    };

    return (
        <div className="p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Notes.map((Note) => (
                    <NoteCard
                        key={Note.id}
                        Note={Note}
                        change_text_note_popup={change_text_note_popup}
                        change_Voice_note_popup={change_Voice_note_popup}
                    />
                ))}
            </ul>
            <AnimatePresence>
                {text_note_popup && (
                    <div className="min-h-[500px]">
                        <Text_Note_PopUp
                            note_id={text_note_popup}
                            set_text_note_popup={set_text_note_popup}
                            Notes={Notes}
                            setNotes={setNotes}
                        />
                    </div>
                )}
            </AnimatePresence>{" "}
            <AnimatePresence>
                {Voice_note_popup && (
                    <div className="min-h-[500px]">
                        <Voice_Note_PopUp
                            note_id={Voice_note_popup}
                            set_Voice_note_popup={set_Voice_note_popup}
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
