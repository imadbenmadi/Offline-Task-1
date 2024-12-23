import React, { useState } from "react";
import RecordAudio from "./RecordAudio";
import Axios from "axios";
import Swal from "sweetalert2";
function Input() {
    const [showAudioPopup, setShowAudioPopup] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const toggleAudioPopup = () => {
        setShowAudioPopup(!showAudioPopup);
    };

    const post_note = async () => {
        const Title = document.getElementById("Title").value || "UnTitled";
        const Description = document.getElementById("Description").value || "";

        const formData = new FormData();
        formData.append("Title", Title);
        formData.append("Description", Description);

        if (audioBlob) {
            formData.append("voice_note", audioBlob, "recording.webm");
        }

        try {
            let res = await Axios.post(
                "http://localhost:3000/Notes",
                formData,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            console.log(res);

            if (res.status === 200) {
                Swal.fire("Success", "Note added successfully", "success");
                setAudioBlob(null); // Clear the audioBlob after submission
            } else {
                Swal.fire("Error", "Failed to add note", "error");
            }
        } catch (error) {
            console.error("Error submitting note:", error);
        }
    };

    return (
        <div className="flex flex-col items-center w-screen bg-gray-100 py-6 px-4 rounded-lg">
            {/* Input Fields */}
            <div className="flex flex-col space-y-4 w-full max-w-3xl">
                <input
                    type="text"
                    id="Title"
                    placeholder="Title"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    id="Description"
                    placeholder="Type your message..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <div className="flex justify-between items-center space-x-4">
                    <button
                        onClick={toggleAudioPopup}
                        className="flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        🎙️ Record Audio
                    </button>
                    <button
                        onClick={post_note}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Post Note
                    </button>
                </div>
            </div>

            {/* Audio Recording Popup */}
            {showAudioPopup && (
                <div className="fixed inset-0  flex items-center justify-center shadow-lg bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 space-y-4  max-w-sm w-full">
                        <RecordAudio setAudioBlob={setAudioBlob} />
                        <button
                            onClick={toggleAudioPopup}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Input;
