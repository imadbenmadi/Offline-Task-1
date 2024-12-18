import React, { useState } from "react";

function Input() {
    const [showAudioPopup, setShowAudioPopup] = useState(false);

    const toggleAudioPopup = () => {
        setShowAudioPopup(!showAudioPopup);
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            {/* Input field and submit button */}
            <div className="flex items-center space-x-2 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Submit
                </button>
            </div>

            {/* Record Audio Button */}
            <button
                onClick={toggleAudioPopup}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
                Record Audio
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
