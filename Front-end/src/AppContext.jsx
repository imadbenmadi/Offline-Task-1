import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

const initialState = {
    isAuth: false,
    user: null,
    Notifications: null,
    userId: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                userId: action.payload.userId,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuth: false,
            };
        case "SET_AUTH":
            return {
                ...state,
                isAuth: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload, // Update user data
            };
        case "SET_MESSAGES":
            return {
                ...state,
                Notifications: action.payload,
            };
        case "SET_NOTIFICATIONS":
            return {
                ...state,
                Notifications: action.payload,
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const set_Auth = (isAuth) => {
        dispatch({ type: "SET_AUTH", payload: isAuth });
    };
    const store_login = (userId) => {
        dispatch({
            type: "LOGIN",
            payload: {
                userId,
            },
        });
    };
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };
    const set_user = (user) => {
        dispatch({ type: "SET_USER", payload: user });
    };

    const set_Messages = (Notifications) => {
        dispatch({
            type: "SET_MESSAGES",
            payload: Notifications,
        });
    };
    const set_Notifications = (Notifications) => {
        dispatch({
            type: "SET_NOTIFICATIONS",
            payload: Notifications,
        });
    };
    const AppContextValue = {
        ...state,
        logout,
        set_Auth,
        store_login,
        set_user,
        set_Messages,
        set_Notifications,
    };
    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
};
