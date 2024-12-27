import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Get_Profile from "../API_Calls/Profile_APIS/Get_Profile";
function Profile() {
    const { userId } = useAppContext();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Get_Profile({ setUser: setUser });
    }, []);
    if (loading) return <h1>Loading...</h1>;
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
                    {userId?.firstName || "unavailable"}{" "}
                    {userId?.lastName || ""}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium"> Email :</span>{" "}
                    {userId?.email || "unavailable"}
                </p>
            </div>

            <div className="border-b pb-4 mb-4 text-gray-600">
                <p>
                    <span className="font-medium">Account Create on :</span>{" "}
                    {userId?.createdAt
                        ? dayjs(userId?.createdAt).format("DD-MMM-YYYY")
                        : "unavailable"}
                </p>
                <p>
                    <span className="font-medium">Last Account Update :</span>{" "}
                    {userId?.updatedAt
                        ? dayjs(userId?.createdAt).format("DD-MMM-YYYY")
                        : "unavailable"}
                </p>
            </div>

            <div className="flex justify-center mt-6">
                <Link
                    to={`/Profile/Edit`}
                    className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}

export default Profile;
