import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    if (!user) return <Navigate to="/login" />;

    // Si la ruta pide rol 1 → solo rol 1 entra
    if (role === 1 && user.rol !== 1) {
        return <Navigate to="/" />;
    }

    // Si la ruta pide rol 2 → rol 1 y rol 2 entran
    if (role === 2 && user.rol !== 1 && user.rol !== 2) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
