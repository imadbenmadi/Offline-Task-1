import Axios from "axios";
import Swal from "sweetalert2";

const Delete_Note = async ({ Note, setNotes }) => {
    if (!Note || !Note.id) {
        Swal.fire("Error", "Note not found", "error");
        return;
    }

    try {
        let res = await Axios.delete(
            `http://localhost:3000/Notes/${Note.id}`,

            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );

        console.log(res);

        if (res.status == 200) {
            Swal.fire("Success", "Note Deleted successfully", "success");
            setNotes((prev) => prev.filter((note) => note.id !== Note.id));
        } else if (res.status == 401) {
            window.location.href = "/";
        } else {
            console.log(res);
            Swal.fire("Error", "Failed to Delet note", "error");
        }
    } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to Delet note", "error");
    }
};
export default Delete_Note;
