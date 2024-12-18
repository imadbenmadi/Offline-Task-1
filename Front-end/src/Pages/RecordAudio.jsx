import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const RecordAudio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const waveformRef = useRef(null);
    const waveSurferInstance = useRef(null);

    // Initialize WaveSurfer instance on mount
    useEffect(() => {
        waveSurferInstance.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#A78BFA", // Violet
            progressColor: "#8B5CF6", // Indigo
            cursorColor: "#6366F1", // Blue
            barWidth: 3,
            height: 80,
            responsive: true,
            interact: false,
        });
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            const audioChunks = [];
            recorder.ondataavailable = (e) => audioChunks.push(e.data);

            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
                setAudioBlob(audioBlob);

                // Load audio into WaveSurfer
                const audioURL = URL.createObjectURL(audioBlob);
                waveSurferInstance.current.load(audioURL);
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

    const submitAudio = async () => {
        if (!audioBlob) {
            alert("No audio recorded to submit!");
            return;
        }

        const formData = new FormData();
        formData.append("vocal", audioBlob, "recording.webm");

        try {
            const response = await fetch("/vocals", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Audio submitted successfully!");
                deleteRecording();
            } else {
                alert("Failed to submit audio.");
            }
        } catch (error) {
            console.error("Error submitting audio:", error);
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
        waveSurferInstance.current.empty();
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
                Audio Recorder
            </h1>

            {/* Waveform Visualization */}
            <div
                ref={waveformRef}
                className="mt-6 bg-gray-200 border border-gray-300 rounded-md h-20 flex items-center justify-center"
            >
                {!audioBlob && !isRecording && (
                    <p className="text-gray-500">
                        Start recording to see the waves
                    </p>
                )}
            </div>

            {/* Recording and Control Buttons */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                        isRecording
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                >
                    Start Recording
                </button>
                <button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                        !isRecording
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                >
                    Stop Recording
                </button>
            </div>

            {/* Playback, Submit, and Delete Buttons */}
            {audioBlob && (
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Playback
                    </h3>
                    <audio
                        controls
                        className="w-full border border-gray-300 rounded-md"
                    >
                        <source
                            src={URL.createObjectURL(audioBlob)}
                            type="audio/webm"
                        />
                        Your browser does not support the audio element.
                    </audio>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={submitAudio}
                            className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition"
                        >
                            Submit
                        </button>
                        <button
                            onClick={deleteRecording}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordAudio;
