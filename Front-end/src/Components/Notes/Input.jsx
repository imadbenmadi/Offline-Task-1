import React, { useState } from "react";

function Input() {
    const [showAudioPopup, setShowAudioPopup] = useState(false);

    const toggleAudioPopup = () => {
        setShowAudioPopup(!showAudioPopup);
    };

    return (
        <div className="flex items-center w-screen max-w-lg bg-gray-100 p-4 rounded-lg shadow">
            {/* Input Field and Record Button */}
            <div className="flex items-center flex-grow space-x-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={toggleAudioPopup}
                    className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    🎙️
                </button>
            </div>
            {/* Send Button */}
            <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Send
            </button>

            {/* Audio Recording Popup */}
            {showAudioPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg">
                        <p className="text-gray-700">Recording audio...</p>
                        <button
                            onClick={toggleAudioPopup}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
