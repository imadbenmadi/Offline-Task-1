import axios from "axios";
import Swal from "sweetalert2";

const handleLogout = async () => {
    try {
        const response = await axios.post(
            "http://localhost:3000/auth/Logout",
            {},
            {
                withCredentials: true,
            }
        );
        window.location.href = "/";
    } catch (error) {
        Swal.fire("Error!", `Something Went Wrong ${error}`, "error");
    }
};
export default handleLogout;
