"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getMe } from "./api.js";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getMe()
        .then((res) => setUser(res.data.user))
        .catch(() => { Cookies.remove("token"); setUser(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = (token, userData) => {
    Cookies.set("token", token, { expires: 7 });
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};