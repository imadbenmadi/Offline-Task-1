import React from "react";
import { motion } from "framer-motion";

function Note_PopUp({ note_id, setNote_popup, Notes }) {
    const note = Notes.find((n) => n.id === note_id);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => setNote_popup(false)}
                >
                    ✕
                </button>

                {/* Content */}
                {!note ? (
                    <p className="text-red-500 text-center">Invalid note!</p>
                ) : note.type === "text" ? (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {note.Title}
                        </h2>
                        <p className="mt-4 text-gray-600">{note.Description}</p>
                    </div>
                ) : note.type === "audio" ? (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {note.Title}
                        </h2>
                        <audio
                            controls
                            className="mt-4 w-full"
                            src={note.Audio_Link}
                        >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">
                        Invalid note type!
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}

export default Note_PopUp;
