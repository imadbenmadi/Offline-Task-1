import React from "react";
import dayjs from "dayjs";

function NoteCard({ Note, change_note_popup }) {
    return (
        <li
            className="border cursor-pointer rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 min-h-[200px]"
            onClick={() => change_note_popup(Note.id)}
        >
            <div className="p-4 flex flex-col justify-between h-full">
                <div>
                    {/* Note Title */}
                    <h4 className="text-lg font-semibold text-blue-700 text-center mb-2">
                        {Note.Title}
                    </h4>

                    {/* Note Description */}
                    <p className="text-gray-700 mb-4 text-sm">
                        {Note.Description
                            ? Note.Description.length > 100
                                ? Note.Description.substring(0, 100) + "..."
                                : Note.Description
                            : "No Description"}
                    </p>
                </div>
                {/* Note Date */}
                <p className="text-xs font-semibold text-gray-500 text-right">
                    {dayjs(Note.createdAt).format("DD-MMM-YYYY")}
                </p>
            </div>
        </li>
    );
}
export default NoteCard;
