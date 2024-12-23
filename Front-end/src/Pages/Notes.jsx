import React, { useState, useEffect } from "react";
import NotesList from "../Components/Notes/NotesList";
import Input from "../Components/Notes/Input";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import fetchNotes from "../API_Calls/Fetch_Notes";
function Notes() {
    const [Notes, setNotes] = useState([]);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        fetchNotes({ setNotes });
    }, []);

    return (
        <div className="relative  w-full overflow-auto">
            {/* Notes List */}
            <div className="mt-6">
                <NotesList Notes={Notes} />
            </div>

            {/* Floating Button */}
            <motion.div
                className="fixed right-12"
                animate={{
                    bottom: showInput ? "20rem" : "3rem", // Moves button upward when input is visible
                }}
                initial={{ bottom: "3rem" }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
            >
                <button
                    onClick={() => setShowInput(!showInput)}
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
                >
                    {showInput ? "Close" : "Add Note"}
                </button>
            </motion.div>

            {/* Animated Input Section */}
            <AnimatePresence>
                {showInput && (
                    <motion.div
                        className="fixed bottom-0 w-full shadow-lg"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.3 }}
                    >
                        <Input setNotes={setNotes} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Notes;
