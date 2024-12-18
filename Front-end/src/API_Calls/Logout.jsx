import axios from "axios";
import Swal from "sweetalert2";

const handleLogout = async ({ setLogoutClicked, logout, set_Auth }) => {
    setLogoutClicked(true);
    try {
        // Send a request to the logout endpoint on the server
        const response = await axios.post(
            "http://localhost:3000/logout",
            {},
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        if (response.status == 204) {
            logout();
            set_Auth(false);
            window.location.href = "/";
        } else {
            Swal.fire("Error!", `Something Went Wrong ,`, "error");
        }
    } catch (error) {
        Swal.fire("Error!", `Something Went Wrong `, "error");
    }
    setLogoutClicked(false);
};
export default handleLogout;
