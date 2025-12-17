'use client';

import { createContext, useState, useEffect } from "react";
import client from "@/api/client.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

    client.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: listener } = client.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
}, []);

return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
);
}

export {AuthProvider, AuthContext};