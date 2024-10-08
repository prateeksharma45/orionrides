import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
    let [user, setUser] = useState({})

    const storeTokenInLS = (token) => {
        localStorage.setItem("token", token);
        setAuthToken(token);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const userAuthentication = async () => {
        if (!authToken) return

        try {
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            if (res.ok) {
                let data = await res.json();
                setUser(data)
            } else {
                console.error("Failed to authenticate user");
                setUser({});
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser({});
        }
    }

    useEffect(() => {
        userAuthentication()
    }, [authToken])

    const logoutUser = () => {
        localStorage.removeItem("token");
        setAuthToken("");
    };

    return (
        <AuthContext.Provider value={{ authToken, storeTokenInLS, logoutUser, user, userAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};
