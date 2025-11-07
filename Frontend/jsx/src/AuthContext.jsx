import {createContext, useState, useContext} from "react";
import { useEffect } from "react";
export const AuthContext = createContext();
export function AuthProvider({children}){
    const [user, setUser]=useState(null);
    useEffect(() => {
  const raw = localStorage.getItem("username");
  if (raw) setUser(JSON.parse(raw));
}, []);
    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}