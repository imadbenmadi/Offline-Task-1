import React, { useState, useEffect } from "react";
import NotesList from "../Components/Notes/NotesList";
import Input from "../Components/Notes/Input";
import { motion, AnimatePresence } from "framer-motion";

function Notes() {
    const [Notes, setNotes] = useState([]);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/Notes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.status === "success") {
                    setNotes(data.data.Notes);
                }
            });
    }, []);

    return (
        <div className="relative flex flex-col w-full overflow-auto">
            {/* Notes List */}
            <NotesList Notes={Notes} />

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
                        className="fixed bottom-0 w-full bg-gray-200 p-4 shadow-lg"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.3 }}
                    >
                        <Input />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Notes;
