import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Default from "./Default";
import Notes from "./Pages/Notes";
import Profile from "./Pages/Profile";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                element: <Default />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Notes",
                element: <Notes />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Profile",
                element: <Profile />,
                errorElement: <ErrorElement />,
            },
        ],
    },
    
    {
        path: "/Login",
        element: <Login />,
        errorElement: <ErrorElement />,
    },
    {
        path: "/Register",
        element: <Register />,
        errorElement: <ErrorElement />,
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
