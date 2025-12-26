/* eslint-disable react-refresh/only-export-components */
import type { UserContextType, UserData } from "@/types/userTypes";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUserState] = useState<UserData | null>(null);

    // user ko get krne ke liye 

    useEffect(() => {
        const stored = localStorage.getItem("userData");
        if (stored) {
            setUserState(JSON.parse(stored));
        }
    }, []);

    //yaha pe localStorage me user ko set kr rahe hai

    const setUser = (data: UserData) => {
        localStorage.setItem("userData", JSON.stringify(data));
        setUserState(data);
    };

    //user ko delete krne ka function

    const deleteUser = () =>{
        localStorage.removeItem("userData")
        setUserState(null)
    }

    return (
        <UserContext.Provider value={{ user, setUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
};
