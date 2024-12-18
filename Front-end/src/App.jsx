import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Logo from "../public/Logo.png";
import { useAppContext } from "./AppContext";
import NavBar from "./Components/NavBar/NavBar";
function App() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { set_Auth, store_login } = useAppContext();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/auth/Check_Auth",
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    if (!response.data.userId) {
                        set_Auth(false);
                        return;
                    }
                    set_Auth(true);
                    store_login(response.data.userId);
                } else {
                    set_Auth(false);
                }
            } catch (error) {
                set_Auth(false);
            }
        };

        const fetch_fonts = () => {
            return new Promise((resolve) => {
                const fontURL =
                    "https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap";
                const link = document.createElement("link");
                link.href = fontURL;
                link.rel = "stylesheet";
                link.onload = () => {
                    document.getElementById("root").style.fontFamily =
                        "Poppins, sans-serif";
                    resolve();
                };
                link.onerror = () => {
                    document.getElementById("root").style.fontFamily =
                        "sans-serif";
                    resolve();
                };
                document.head.appendChild(link);
            });
        };

        Promise.all([fetch_fonts(), fetchData()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    } else
        return (
            <div className=" text-right relative min-h-screen ">
                <NavBar />
                <div className=" pt-6">
                    <Outlet />
                </div>
            </div>
        );
}

export default App;
