import axios from "axios";

const fetchNotes = async ({ setNotes }) => {
    try {
        let res = await axios.get("http://localhost:3000/Notes", {
            withCredentials: true,
        });
        setNotes(res.data);
    } catch (error) {
        window.location.href = "/";
        console.error("Error fetching notes:", error);
    }
};
export default fetchNotes;
