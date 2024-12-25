import React, { useState, useEffect } from "react";
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
    const [isPaused, setIsPaused] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
    const [timer, setTimer] = useState(null); // Reference for the timer

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
                setAudioChunks([]);
            };

            recorder.start();
            setIsRecording(true);
            startTimer(); // Start the timer
        } catch (error) {
            Swal.fire("Error", "Failed to start recording", "error");
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.pause();
            setIsPaused(true);
            pauseTimer(); // Pause the timer
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "paused") {
            mediaRecorder.resume();
            setIsPaused(false);
            startTimer(); // Resume the timer
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            setIsPaused(false);
            resetTimer(); // Reset the timer
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
        Swal.fire("Deleted", "Recording has been deleted", "info");
    };

    // Timer management
    const startTimer = () => {
        const interval = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
        setTimer(interval);
    };

    const pauseTimer = () => {
        if (timer) clearInterval(timer);
    };

    const resetTimer = () => {
        if (timer) clearInterval(timer);
        setElapsedTime(0);
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
                            <>
                                <button
                                    onClick={startRecording}
                                    className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
                                >
                                    <FaMicrophone size={24} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div className=" flex flex-col items-center gap-4">
                                    <div className=" flex items-center gap-4">
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
                                    </div>

                                    <div className="text-center text-gray-600 mt-2 font-semibold">
                                        {` ${Math.floor(elapsedTime / 60)
                                            .toString()
                                            .padStart(2, "0")}:${(
                                            elapsedTime % 60
                                        )
                                            .toString()
                                            .padStart(2, "0")}`}
                                    </div>
                                </div>
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
