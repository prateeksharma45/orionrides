import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    let { showToast } = useToast();
    const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
    let [user, setUser] = useState({})
    let [loading, setLoading] = useState(false)

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

        setLoading(true);
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
                logoutUser();
                showToast("Failed to authenticate user!", 'error');
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser({});
        } finally {
            setLoading(false);
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
        <AuthContext.Provider value={{ authToken, storeTokenInLS, logoutUser, user, userAuthentication, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
