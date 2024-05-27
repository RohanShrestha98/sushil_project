import { createContext, useEffect } from "react";
import React, { useState } from "react";

interface AuthContextType {
    login: ({ token, email }: { token: string, email: string }) => void;
    logout: () => void;
    getEmail: () => string;
    isAuthenticated: () => boolean;
    getToken: () => string | undefined;
}

interface UserDataType {
    token: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userState, setUserState] = useState<UserDataType | null>();

    const login = ({ token, email }: UserDataType) => {
        console.log(token, email)
        setUserState({ token, email });
    }

    const logout = () => {
        setUserState(null);
    }

    const getEmail = () => {
        return userState?.email ? userState.email : "";
    }

    const isAuthenticated = () => {
        if (userState?.token) {
            return true;
        }
        return false;
    }
    const [vendorId, setVendorId] = useState(localStorage.getItem('vendorID'))
    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const storedId = JSON.parse(localStorage.getItem('vendorID'));
        if (storedId) {
            setVendorId(storedId);
        }
    }, []);

    console.log("vendorId", vendorId)

    const getToken = () => {
        return vendorId;
    }

    return (
        <AuthContext.Provider value={{ login, logout, getEmail, isAuthenticated, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}