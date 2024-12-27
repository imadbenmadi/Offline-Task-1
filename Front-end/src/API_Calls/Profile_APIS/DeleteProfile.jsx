import Axios from "axios";
import Swal from "sweetalert2";

const Delete_Profile = async ({ setDeleteLoading }) => {
    setDeleteLoading(true);
    try {
        let res = await Axios.delete(`http://localhost:3000/Profile`, {
            withCredentials: true,
            validateStatus: () => true,
        });
        console.log(res);

        if (res.status == 200) {
            window.location.href = "/";
        } else if (res.status == 401) {
            window.location.href = "/";
        } else {
            Swal.fire("Error", "Failed to Delete Profile", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Failed to Delete Profile", "error");
    } finally {
        setDeleteLoading(false);
    }
};
export default Delete_Profile;
