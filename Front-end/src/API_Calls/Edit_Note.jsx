import Axios from "axios";
import Swal from "sweetalert2";

const Edit_Note = async ({ Title, Description, Note, setNotes }) => {
    if (Note?.type !== "text") {
        console.error("Invalid note type");
        return;
    }
    const formData = new FormData();

    if (Title) formData.append("Title", Title);
    if (Description) formData.append("Description", Description);
    formData.append("type", "text");

    try {
        let res = await Axios.put("http://localhost:3000/Notes", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
            validateStatus: () => true,
        });
        console.log(res);

        if (res.status === 200) {
            Swal.fire("Success", "Note edited successfully", "success");
            setNotes((prev) => [res.data, ...prev]);
            setAudioBlob(null); // Clear the audioBlob after submission
        } else {
            Swal.fire("Error", "Failed to edit note", "error");
        }
    } catch (error) {
        console.error("Error submitting note:", error);
    }
};
export default Edit_Note;
