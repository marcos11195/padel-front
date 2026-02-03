import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("user");

        if (stored) {
            const parsed = JSON.parse(stored);

            // ✅ CAMBIO 1: Normalizamos la foto al iniciar
            parsed.foto = parsed.foto
                ?.replace("uploads/", "")
                ?.replace("/uploads/", "");

            setUser(parsed);
        }

        // ❌ CAMBIO 2: Eliminado el fetch a /auth/me (NO existe en tu backend)
        // Antes aquí se hacía apiFetch("/auth/me") → eso rompía la sesión

        setLoading(false);
    }, []);

    const login = (userData) => {
        // ✅ CAMBIO 3: Normalizamos la foto también al hacer login
        userData.foto = userData.foto
            ?.replace("uploads/", "")
            ?.replace("/uploads/", "");

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
