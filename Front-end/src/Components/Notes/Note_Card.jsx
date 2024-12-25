import React from "react";
import dayjs from "dayjs";

function NoteCard({ Note, change_note_popup }) {
    if (!Note) return null;
    else if (Note.type === "audio" && !Note.Audio_Link) return null;
    else if (Note.type != "text" && !Note.type === "audio") return null;
    return (
        <li
            className="border cursor-pointer rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 min-h-[200px]"
            onClick={() => change_note_popup(Note.id)}
        >
            <div className="p-4 flex flex-col justify-between h-full">
                {Note.type === "audio" ? (
                    <div>
                        {/* Note Title */}
                        <h4 className="text-lg font-semibold text-blue-700 text-center mb-2">
                            Audio Note
                        </h4>

                        {/* Audio Player */}
                        <audio
                            controls
                            className="w-full border border-gray-300 rounded-md"
                        >
                            <source
                                src={`${Note.Audio_Link}`}
                                type="audio/webm"
                            />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ) : Note.type === "text" ? (
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
                ) : null}

                {/* Note Date */}
                <p className="text-xs font-semibold text-gray-500 text-right">
                    {dayjs(Note.createdAt).format("DD-MMM-YYYY")}
                </p>
            </div>
        </li>
    );
}
export default NoteCard;
