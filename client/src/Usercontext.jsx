import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    let [user, setUser] = useState(null);
    let [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            try {
                axios.get('/profile').then(({ data }) => {
                    setUser(data);
                    setReady(true);
                });
            } catch (e) {
                console.log(e);
            }
        }
    })
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}