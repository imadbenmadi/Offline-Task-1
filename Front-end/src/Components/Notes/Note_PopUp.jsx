import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Edit_Note from "../../API_Calls/Edit_Note";
import Delete_Note from "../../API_Calls/Delete_Note";
import Swal from "sweetalert2";

function Note_PopUp({ note_id, setNote_popup, Notes, setNotes }) {
    const [note, setNote] = useState(null);

    useEffect(() => {
        if (!note_id) {
            Swal.fire("Error", "Invalid note id", "error");
            setNote_popup(false);
            return;
        }
        setNote(Notes.find((n) => n.id === parseInt(note_id)));
    }, [note_id, Notes, setNote_popup]);

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        if (note) {
            setEditTitle(note.Title);
            setEditDescription(note.Description);
        }
    }, [note]);

    const handleEditToggle = () => setIsEditing((prev) => !prev);

    const handleEditCancel = () => {
        setEditTitle(note?.Title || "");
        setEditDescription(note?.Description || "");
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        try {
            await Edit_Note({
                Title: editTitle,
                Description: editDescription,
                Note: note,
                setNotes,
            });
            setIsEditing(false);
            setNote_popup(false); // Close popup after editing
        } catch (error) {
            Swal.fire("Error", "Failed to edit note", "error");
        }
    };

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
                className="relative bg-white p-12 rounded-lg shadow-lg max-w-md w-full overflow-auto h-full"
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 font-bold hover:text-gray-800 focus:outline-none"
                    onClick={() => setNote_popup(false)}
                >
                    ✕
                </button>

                {!note ? (
                    <p className="text-red-500 text-center">Invalid note!</p>
                ) : (
                    <div className="flex flex-col justify-between h-full">
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                    className="w-full p-2 border rounded-md text-gray-800 mb-4"
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e) =>
                                        setEditDescription(e.target.value)
                                    }
                                    className="w-full p-2 border rounded-md text-gray-800"
                                    rows="5"
                                />
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold text-blue-600">
                                    {note.Title}
                                </h2>
                                <p className="mt-4 text-gray-600">
                                    {note.Description}
                                </p>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={handleEditCancel}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <div className="w-full">
                                    <p className="text-xs font-semibold text-gray-500 text-right mt-6">
                                        {dayjs(note.createdAt).format(
                                            "DD-MMM-YYYY"
                                        )}
                                    </p>
                                    <div className="flex justify-center gap-6 items-center mt-4">
                                        {note.type === "text" && (
                                            <button
                                                onClick={handleEditToggle}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                Delete_Note({
                                                    Note: note,
                                                    setNotes,
                                                });
                                            }}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default Note_PopUp;
