import React from "react";

function Note_PopUp({ note_id, setNote_popup, Notes }) {
    const note = Notes.find((n) => n.id === note_id);

    if (!note) {
        return (
            <div>
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setNote_popup(false)}
                >
                    ✕
                </button>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <p className="text-red-500">Invalid note!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setNote_popup(false)}
                >
                    ✕
                </button>
                {note.type === "text" ? (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {note.Title}
                        </h2>
                        <p className="mt-4 text-gray-600">{note.Description}</p>
                    </div>
                ) : note.type === "audio" ? (
                    <div>
                        <audio
                            controls
                            className="mt-4 w-full"
                            src={note.Audio_Link}
                        >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ) : (
                    <p className="text-red-500">Invalid note type!</p>
                )}
            </div>
        </div>
    );
}

export default Note_PopUp;
