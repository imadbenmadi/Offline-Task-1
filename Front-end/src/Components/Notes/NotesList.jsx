import React from "react";
import dayjs from "dayjs";
function NotesList({ Notes }) {
    if (!Notes || Notes.length === 0) {
        return (
            <div
                className="text-center pt-12
             text-gray-700 mt-10"
            >
                No Notes Yet !
            </div>
        );
    }
    return (
        <div className="p-6 ">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Notes.map((Note) => (
                    <NoteCard key={Note.id} Note={Note} />
                ))}
            </ul>
        </div>
    );
}
function NoteCard({ Note }) {
    return (
        <li className="border w-[280px] rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <div className="p-4">
                {/* Note Title */}
                <h4 className="text-lg text-center font-semibold text-blue-700 mb-2">
                    {Note.Title}
                </h4>

                {/* Note Description */}
                <p className="text-gray-700 mb-4">
                    {Note?.Description
                        ? Note.Description.length > 100
                            ? Note.Description?.substring(0, 100) + "..."
                            : Note.Description
                        : null}
                </p>

                {/* Note Date */}
                <p className="text-xs font-semibold text-gray-500 mb-2">
                    {dayjs(Note?.createdAt).format("DD-MMM-YYYY")}
                </p>
            </div>
        </li>
    );
}

export default NotesList;
