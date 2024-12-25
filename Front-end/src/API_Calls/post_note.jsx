import Axios from "axios";
import Swal from "sweetalert2";

const post_note = async ({ audioBlob, setAudioBlob, setNotes }) => {
    const Title = document.getElementById("Title").value || "UnTitled";
    const Description = document.getElementById("Description").value || "";

    const formData = new FormData();

    if (audioBlob != null) {
        formData.append("voice_note", audioBlob, "recording.webm");
        formData.append("type", "audio");
    } else {
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
        console.log(res);

        if (res.status === 200) {
            Swal.fire("Success", "Note added successfully", "success");
            setNotes((prev) => [res.data, ...prev]);
            setAudioBlob(null); // Clear the audioBlob after submission
        } else {
            Swal.fire("Error", "Failed to add note", "error");
        }
    } catch (error) {
        console.error("Error submitting note:", error);
    }
};
export default post_note;
