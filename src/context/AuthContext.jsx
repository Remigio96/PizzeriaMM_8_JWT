/* eslint react-refresh/only-export-components: ["warn", { "allowExportNames": ["useAuth"] }] */
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const isAuth = !!token;

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);


  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Error al iniciar sesión");
    const data = await res.json();
    setToken(data.token);
    setUser({ email: data.email });
  }, []);

  const register = useCallback(async (email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Error al registrarse");
    const data = await res.json();
    setToken(data.token);
    setUser({ email: data.email });
  }, []);

  const getProfile = useCallback(async () => {
    if (!token) return;
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    setUser({ email: data.email });
  }, [token]);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, user, token, login, register, getProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
