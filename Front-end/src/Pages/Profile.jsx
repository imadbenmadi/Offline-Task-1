import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Get_Profile from "../API_Calls/Profile_APIS/Get_Profile";
import DeletePrfile from "../API_Calls/Profile_APIS/DeleteProfile";
function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [DeleteLoading, setDeleteLoading] = useState(false);
    useEffect(() => {
        Get_Profile({ setUser: setUser, setLoading });
    }, []);
    if (loading) {
        return (
            <div className="w-[100vw] h-[80vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }
    if (!user) return <h1>Failed to fetch user data</h1>;
    return (
        <div
            className="max-w-lg mx-auto p-6 mt-12 bg-white shadow-lg rounded-lg border border-gray-200 text-left"
            dir="rtl"
        >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Personal Profile{" "}
            </h2>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Personal Data{" "}
                </h3>
                <p className="text-gray-600">
                    <span className="font-medium">Full Name :</span>{" "}
                    {user?.firstName || "unavailable"} {user?.lastName || ""}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium"> Email :</span>{" "}
                    {user?.email || "unavailable"}
                </p>
            </div>

            <div className="border-b pb-4 mb-4 text-gray-600">
                <p>
                    <span className="font-medium">Account Create on :</span>{" "}
                    {user?.createdAt
                        ? dayjs(user?.createdAt).format("DD-MMM-YYYY")
                        : "unavailable"}
                </p>
                <p>
                    <span className="font-medium">Last Account Update :</span>{" "}
                    {user?.updatedAt
                        ? dayjs(user?.createdAt).format("DD-MMM-YYYY")
                        : "unavailable"}
                </p>
            </div>
            <div
                onClick={() => {
                    DeletePrfile({ setDeleteLoading });
                }}
                className={`  cursor-pointer py-2 px-4 rounded-md text-white w-fit mx-auto font-bold ${
                    DeleteLoading
                        ? "bg-gray-400"
                        : "bg-red-500 hover:bg-red-600"
                }`}
            >
                {DeleteLoading ? " Deleting..." : "Delete Profile"}
            </div>
        </div>
    );
}

export default Profile;
