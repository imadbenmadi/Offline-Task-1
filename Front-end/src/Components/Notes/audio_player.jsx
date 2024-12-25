import React from "react";

function audio_player({ Note }) {
    return (
        <div className="bg-gray-50  rounded-lg p-4 flex flex-col items-center">
            {/* Note Title */}
            <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                Audio Note 🎧
            </h4>

            {/* Audio Player */}
            <div className="w-full max-w-lg">
                <audio
                    controls
                    className="w-full rounded-lg bg-gray-100 shadow-inner focus:outline-none"
                >
                    <source src={`${Note.Audio_Link}`} type="audio/webm" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
}

export default audio_player;
