import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";

function Default() {
    const { isAuth, userId } = useAppContext();
    const Navigate = useNavigate();
    useEffect(() => {
        if (isAuth && userId) {
            Navigate("/Notes");
            return;
        }
        Navigate("/Login");
    }, []);
}
export default Default;
