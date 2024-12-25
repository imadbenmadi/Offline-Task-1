import Axios from "axios";
import Swal from "sweetalert2";

const post_note = async ({
    Title,
    Description,
    audioBlob,
    setAudioBlob,
    setNotes,
    setShowInput,
}) => {
    // const Title = document.getElementById("Title").value || "UnTitled";
    // const Description = document.getElementById("Description").value || "";

    const formData = new FormData();

    if (audioBlob != null) {
        formData.append("voice_note", audioBlob, "recording.webm");
        formData.append("type", "audio");
    } else {
        if (
            !Title ||
            Title.trim() === "" ||
            !Description ||
            Description.trim() === ""
        ) {
            Swal.fire("Error", "Title and Description are required", "error");
            return;
        }
        formData.append("Title", Title);
        formData.append("Description", Description);
        formData.append("type", "text");
    }

    try {
        let res = await Axios.post("http://localhost:3000/Notes", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
            validateStatus: () => true,
        });

        if (res.status === 200) {
            Swal.fire("Success", "Note added successfully", "success");
            setNotes((prev) => [res.data, ...prev]);
            setAudioBlob(null); // Clear the audioBlob after submission
            const recorderElement = document.getElementById("recorder");
            if (recorderElement) {
                recorderElement.style.backgroundColor = "white";
            }
            document.getElementById("Title").value = "";
            document.getElementById("Description").value = "";
            setShowInput(false);
        } else if (res.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire("Error", "Failed to add note", "error");
        }
    } catch (error) {
        console.log(error);

        Swal.fire("Error", "Failed to add note", "error");
    }
};
export default post_note;
