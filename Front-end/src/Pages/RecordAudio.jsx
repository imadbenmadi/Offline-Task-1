import React, { useState } from "react";

const RecordAudio = () => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            recorder.start();
            setIsRecording(true);

            const chunks = [];
            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                setAudioBlob(blob);
            };
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
            alert("No audio recorded!");
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
                alert("Audio uploaded successfully!");
                setAudioBlob(null);
            } else {
                alert("Failed to upload audio.");
            }
        } catch (error) {
            console.error("Error uploading audio:", error);
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
    };

    return (
        <div>
            <h1>Audio Recorder</h1>
            <button onClick={startRecording} disabled={isRecording}>
                Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
                Stop Recording
            </button>
            <button onClick={submitAudio} disabled={!audioBlob}>
                Submit
            </button>
            <button onClick={deleteRecording} disabled={!audioBlob}>
                Delete
            </button>
            {audioBlob && (
                <audio controls>
                    <source
                        src={URL.createObjectURL(audioBlob)}
                        type="audio/webm"
                    />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default RecordAudio;
