import React from "react";
import dayjs from "dayjs";
import NoteCard from "./Note_Card";
function NotesList({ Notes }) {
    if (!Notes || Notes.length === 0) {
        return (
            <div className="text-center pt-12 text-gray-700 mt-10">
                No Notes Yet!
            </div>
        );
    }

    return (
        <div className="p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Notes.map((Note) => (
                    <NoteCard key={Note.id} Note={Note} />
                ))}
            </ul>
        </div>
    );
}

export default NotesList;
