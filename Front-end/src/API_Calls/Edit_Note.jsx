import Axios from "axios";
import Swal from "sweetalert2";

const Edit_Note = async ({ Title, Description, Note, setNotes }) => {
    console.log("ze ar in edit note");

    if (!Note || !Note.id) {
        console.error("Note not found");
        return;
    }
    if (Note?.type !== "text") {
        console.error("Invalid note type");
        return;
    }

    try {
        let res = await Axios.put(
            `http://localhost:3000/Notes/${Note.id}`,
            { Title, Description },
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        console.log(res);

        if (res.status === 200) {
            Swal.fire("Success", "Note edited successfully", "success");
            setNotes((prev) => [res.data, ...prev]);
            setAudioBlob(null); // Clear the audioBlob after submission
        } else if (res.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire("Error", "Failed to edit note", "error");
        }
    } catch (error) {
        console.error("Error submitting note:", error);
    }
};
export default Edit_Note;
