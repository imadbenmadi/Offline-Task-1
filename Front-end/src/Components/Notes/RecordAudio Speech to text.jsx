import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

const RecordAudioWithLiveWaves = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [transcription, setTranscription] = useState(""); // To store the transcribed text
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            stopVisualization();
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            // Audio stream analysis setup
            audioContextRef.current = new (window.AudioContext ||
                window.webkitAudioContext)();
            const source =
                audioContextRef.current.createMediaStreamSource(stream);
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;

            source.connect(analyserRef.current);

            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            visualizeWaves();

            const chunks = [];
            recorder.ondataavailable = (e) => chunks.push(e.data);

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                setAudioBlob(blob);

                // Stop visualizations
                stopVisualization();

                setAudioChunks([]);
            };

            recorder.start();
            setIsRecording(true);
        } catch (error) {
            Swal.fire("Error", "Error accessing microphone.", "error");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const visualizeWaves = () => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");
        const analyser = analyserRef.current;
        const dataArray = dataArrayRef.current;

        const draw = () => {
            animationIdRef.current = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = "#f3f4f6"; // Gray background
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = "#6366f1"; // Indigo waves
            canvasCtx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / dataArray.length;
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };

        draw();
    };

    const stopVisualization = () => {
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    const transcribeAudio = async () => {
        if (!audioBlob) {
            Swal.fire("Error", "No audio to transcribe.", "error");
            return;
        }

        const formData = new FormData();
        formData.append("vocal", audioBlob, "recording.webm");

        try {
            const response = await fetch("/transcribe", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setTranscription(data.transcription); // Populate transcription
                Swal.fire(
                    "Success",
                    "Audio transcribed successfully.",
                    "success"
                );
            } else {
                Swal.fire(
                    "Error",
                    data.error || "Failed to transcribe audio.",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error", "Failed to transcribe audio.", "error");
        }
    };

    const handleInputChange = (e) => {
        setTranscription(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
                Audio Recorder with Transcription
            </h1>

            {/* Waveform Visualization */}
            <div className="mt-6 bg-gray-200 border border-gray-300 rounded-md h-40">
                <canvas ref={canvasRef} className="w-full h-full"></canvas>
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

            {/* Transcription Input */}
            {audioBlob && (
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Transcription
                    </h3>
                    <textarea
                        value={transcription}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="5"
                    ></textarea>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={transcribeAudio}
                            className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition"
                        >
                            Transcribe
                        </button>
                        <button
                            onClick={() => setTranscription("")}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600 transition"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordAudioWithLiveWaves;
