import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Delete_Note from "../../../API_Calls/Delete_Note";
import Swal from "sweetalert2";
import Audio_Player from "../audio_player";
function Voice_Note_PopUp({ note_id, set_Voice_note_popup, Notes, setNotes }) {
    const [note, setNote] = useState(null);

    useEffect(() => {
        if (!note_id) {
            Swal.fire("Error", "Invalid note id", "error");
            set_Voice_note_popup(false);
            return;
        }
        const foundNote = Notes.find((n) => n.id === parseInt(note_id));

        if (!foundNote) {
            Swal.fire("Error", "Note not found", "error");
            set_Voice_note_popup(false);
        } else {
            setNote(foundNote);
        }
    }, [note_id, Notes, set_Voice_note_popup]);
    if (!note) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="break-words fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative bg-white p-12 rounded-lg shadow-lg max-w-md w-full overflow-auto h-full"
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 font-bold hover:text-gray-800 focus:outline-none"
                    onClick={() => set_Voice_note_popup(false)}
                >
                    ✕
                </button>

                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                            Audio Note 🎧
                        </h4>
                        <Audio_Player url={note?.Audio_Link} />
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <div className="w-full">
                            <p className="text-xs font-semibold text-gray-500 text-right mt-6">
                                {dayjs(note.createdAt).format("DD-MMM-YYYY")}
                            </p>
                            <div className="flex justify-center gap-6 items-center mt-4">
                                <button
                                    onClick={async () => {
                                        await Delete_Note({
                                            Note: note,
                                            setNotes,
                                        })
                                            .then(() =>
                                                set_Voice_note_popup(false)
                                            )
                                            .catch(() => {
                                                Swal.fire(
                                                    "Error",
                                                    "Failed to delete note",
                                                    "error"
                                                );
                                            });
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Voice_Note_PopUp;
