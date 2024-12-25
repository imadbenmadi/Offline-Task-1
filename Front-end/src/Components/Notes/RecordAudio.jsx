import React, { useState } from "react";
import {
    FaMicrophone,
    FaStop,
    FaTrash,
    FaPaperPlane,
    FaPause,
    FaPlay,
} from "react-icons/fa";
import Swal from "sweetalert2";
import post_note from "../../API_Calls/post_note";
import Audio_player from "./audio_player";

const AudioRecorder = ({ setAudioBlob, audioBlob, setNotes, setShowInput }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Track pause state
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            const chunks = [];
            recorder.ondataavailable = (e) => chunks.push(e.data);

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                setAudioBlob(blob);
                setAudioChunks([]); // Clear chunks after saving
            };

            recorder.start();
            setIsRecording(true);
        } catch (error) {
            Swal.fire("Error", "Failed to start recording", "error");
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.pause();
            setIsPaused(true);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "paused") {
            mediaRecorder.resume();
            setIsPaused(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            setIsPaused(false); // Reset pause state
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
        Swal.fire("Deleted", "Recording has been deleted", "info");
    };

    return (
        <div className="max-w-sm mx-auto p-4 bg-white rounded-lg">
            {!audioBlob && (
                <>
                    <h1 className="text-xl font-bold text-gray-800 text-center">
                        Voice Recorder
                    </h1>
                    <div className="flex justify-center mt-6 gap-4">
                        {!isRecording ? (
                            <button
                                onClick={startRecording}
                                className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
                            >
                                <FaMicrophone size={24} />
                            </button>
                        ) : (
                            <>
                                {!isPaused ? (
                                    <button
                                        onClick={pauseRecording}
                                        className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition"
                                    >
                                        <FaPause size={24} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={resumeRecording}
                                        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
                                    >
                                        <FaPlay size={24} />
                                    </button>
                                )}
                                <button
                                    onClick={stopRecording}
                                    className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
                                >
                                    <FaStop size={24} />
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}

            {audioBlob && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        Recorded Audio
                    </h2>
                    <Audio_player url={URL.createObjectURL(audioBlob)} />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() =>
                                post_note({
                                    audioBlob,
                                    setAudioBlob,
                                    setNotes,
                                    setShowInput,
                                })
                            }
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 transition"
                        >
                            <FaPaperPlane />
                            Submit
                        </button>
                        <button
                            onClick={deleteRecording}
                            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded shadow-md hover:bg-gray-700 transition"
                        >
                            <FaTrash />
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
