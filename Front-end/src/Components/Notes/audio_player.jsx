import React from "react";

function audio_player({ url }) {
    return (
        <div className="bg-gray-50  rounded-lg p-4 flex flex-col items-center">
           

            {/* Audio Player */}
            <div className="w-full max-w-lg">
                <audio
                    controls
                    className="w-full rounded-lg* focus:outline-none"
                >
                    <source src={`${url}`} type="audio/webm" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
}

export default audio_player;
