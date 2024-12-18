import Items from "./Items";
import { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import handleLogout from "../../API_Calls/Logout";
function NavBar() {
    const [Active_nav, setActive_nav] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[2]);
    }, [location.pathname]);

    const [LogoutClicked, setLogoutClicked] = useState(false);

    return (
        <div
            className={` fixed  h-[60px] m-0  z-40 w-full bg-white  border-b   `}
        >
            <Items
                Active_nav={Active_nav}
                handleLogout={handleLogout}
                LogoutClicked={LogoutClicked}
                setLogoutClicked={setLogoutClicked}
            />
        </div>
    );
}

export default NavBar;
