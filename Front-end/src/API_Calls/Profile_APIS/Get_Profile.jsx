import axios from "axios";
import Swal from "sweetalert2";

const fetchProfile = async ({ setUser, setLoading }) => {
    setLoading(true);
    try {
        let res = await axios.get("http://localhost:3000/Profile", {
            withCredentials: true,
            validateStatus: () => true,
        });

        if (res.status === 401) {
            window.location.href = "/";
        } else if (res.status === 200) setUser(res.data);
        else Swal.fire("Error", "Failed to fetch Profile", "error");
    } catch (error) {
        Swal.fire("Error", "Failed to fetch Profile", "error");
    } finally {
        setLoading(false);
    }
};
export default fetchProfile;
