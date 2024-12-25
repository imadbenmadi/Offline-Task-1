import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaTrash, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import post_note from "../../API_Calls/post_note";
import Audio_player from "./audio_player";
const AudioRecorder = ({ setAudioBlob, audioBlob, setNotes }) => {
    const [isRecording, setIsRecording] = useState(false);
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
                setAudioChunks([]);
            };

            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
        Swal.fire("Deleted", "Recording has been deleted", "info");
    };

    return (
        <div className="max-w-sm mx-auto p-4 bg-white  rounded-lg">
            {!audioBlob && (
                <>
                    <h1 className="text-xl font-bold text-gray-800 text-center">
                        Voice Recorder
                    </h1>
                    <div className="flex justify-center mt-6">
                        {!isRecording ? (
                            <button
                                onClick={startRecording}
                                className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
                            >
                                <FaMicrophone size={24} />
                            </button>
                        ) : (
                            <button
                                onClick={stopRecording}
                                className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
                            >
                                <FaStop size={24} />
                            </button>
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
                                post_note({ audioBlob, setAudioBlob, setNotes })
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
