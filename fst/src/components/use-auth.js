import React, { useState, useEffect, useContext, createContext } from 'react';
import { login, logout, getUser } from '../core/services/Datastore.js';

const authContext = createContext();
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signin = async (email, password) => {
        const userObject = await login(email, password);
        if (userObject.error === 'unauthorized') {
            setLoading(false);
            return false;
        } else {
            console.log('LOGGING IN');
            console.log(userObject);
            setUser(userObject.data);
            setLoading(false);
            return true;
        }
    };
    const signup = (email, password) => {
    };
    const signout = async () => {
        await logout();
        setUser(null);
    };
    const sendPasswordResetEmail = (email) => {
    };
    const confirmPasswordReset = (code, password) => {
    };

    useEffect(() => {
        getUser().then((response) => {
            if (response.error !== 'unauthorized') {
                console.log('SETTING USER');
                console.log(response);
                setUser(response.data);
            }
            setLoading(false);
        })
    }, []);

    return {
        user,
        loading,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}