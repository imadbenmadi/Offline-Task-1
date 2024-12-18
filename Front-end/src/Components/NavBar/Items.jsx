import { Link } from "react-router-dom";
import user_default from "../../../public/Profile/user_default2.png";
import { useState } from "react";
import { useAppContext } from "../../AppContext";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Profile_Dropdown from "./Profile_Dropdown";
dayjs.extend(customParseFormat);
function Nav_Items({ Active_nav, handleLogout, LogoutClicked }) {
    const { user, set_Auth, logout } = useAppContext();
    const [ProfileClicked, setProfileClicked] = useState(false);
    const toogleProfile = () => {
        setProfileClicked(!ProfileClicked);
    };

    return (
        <div className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12  md:text-md lg:text-lg  font-[500] text-black_text h-full p-2 ">
            <div></div>
            <div className="flex gap-6 lg:gap-14">
                <div
                    className={` ${
                        Active_nav == "Notes"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Notes"} className={" select-none"}>
                        Notes{" "}
                    </Link>
                </div>{" "}
                <div
                    className={` ${
                        Active_nav == "Profile"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Profile"} className={" select-none"}>
                        Profile{" "}
                    </Link>
                </div>{" "}
            </div>
            <div className=" flex items center justify-center gap-5">
                <div className=" relative">
                    {user?.profile_pic_link ? (
                        <img
                            src={user?.profile_pic_link}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = user_default;
                            }}
                            alt="pic"
                            className=" w-8 cursor-pointer"
                            onClick={toogleProfile}
                        />
                    ) : (
                        <img
                            src={user_default}
                            alt="pic"
                            className=" w-8 cursor-pointer"
                            onClick={toogleProfile}
                        />
                    )}

                    <Profile_Dropdown
                        setProfileClicked={setProfileClicked}
                        ProfileClicked={ProfileClicked}
                        LogoutClicked={LogoutClicked}
                        handleLogout={handleLogout}
                    />
                </div>{" "}
            </div>
        </div>
    );
}

export default Nav_Items;
