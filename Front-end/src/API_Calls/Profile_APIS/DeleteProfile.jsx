import Axios from "axios";
import Swal from "sweetalert2";

const Delete_Profile = async () => {
    try {
        let res = await Axios.delete(`http://localhost:3000/Profile`, {
            withCredentials: true,
            validateStatus: () => true,
        });

        if (res.status == 200) {
            Swal.fire("Success", "Profile Deleted successfully", "success");
            window.location.href = "/";
        } else if (res.status == 401) {
            window.location.href = "/";
        } else {
            Swal.fire("Error", "Failed to Delete Profile", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Failed to Delete Profile", "error");
    }
};
export default Delete_Profile;
