import React from "react";
import { FiUser } from "react-icons/fi";
import { Navigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Profile_Dropdown({
    setProfileClicked,
    ProfileClicked,
    LogoutClicked,
    handleLogout,
}) {
    return (
        <div>
            {ProfileClicked ? (
                <div
                    className="absolute top-10 right-0 bg-white shadow border  
                    rounded-lg p-2 w-40 z-50 flex items-center  flex-col gap-3"
                >
                    <div
                        className="text-black_text cursor-pointer w-[80px] "
                        onClick={() => {
                            setProfileClicked(false);
                        }}
                    >
                        <div
                            className=" select-none flex items-center gap-2 "
                            onClick={() => {
                                Navigate("/Profile");
                                // window.location.href =
                                //     "/Profile";
                            }}
                        >
                            <FiUser className="  text-xl " />
                            Profile
                        </div>
                    </div>
                    <div className="">
                        {LogoutClicked ? (
                            <div className="w-full ">
                                <span className="small-loader font-bold m-auto"></span>
                            </div>
                        ) : (
                            <div
                                className="cursor-pointer w-full 
                                    flex items-center gap-3 text-red-500"
                                onClick={() => {
                                    handleLogout();
                                }}
                            >
                                <FiLogOut className="  text-xl" />
                                Logout
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Profile_Dropdown;
