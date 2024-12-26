import Axios from "axios";
import Swal from "sweetalert2";

const Edit_Note = async ({ Title, Description, Note, setNotes }) => {
    if (!Note || !Note.id) {
        Swal.fire("Error", "Note not found", "error");
        return;
    }
    if (Note?.type !== "text") {
        Swal.fire("Error", "Can only update text notes", "error");
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

        if (res.status === 200) {
            Swal.fire("Success", "Note edited successfully", "success");
            setNotes((prev) =>
                prev.map((note) => (note.id === Note.id ? res.data : note))
            ); // Update the existing note
        } else if (res.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire("Error", "Failed to edit note", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Failed to edit note", "error");
    }
};

export default Edit_Note;
