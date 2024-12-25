import axios from "axios";
import Swal from "sweetalert2";

const fetchNotes = async ({ setNotes }) => {
    try {
        let res = await axios.get("http://localhost:3000/Notes", {
            withCredentials: true,
            validateStatus: () => true,
        });
        if (res.status === 401) {
            window.location.href = "/";
        } else if (res.status === 200) setNotes(res.data);
        else Swal.fire("Error", "Failed to fetch notes", "error");
    } catch (error) {
        Swal.fire("Error", "Failed to fetch notes", "error");
    }
};
export default fetchNotes;
