import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [fotoReal, setFotoReal] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchFoto = () => {
            apiFetch("/auth/me", {
                headers: { Authorization: `Bearer ${user.token}` }
            })
                .then(res => res.json())
                .then(data => setFotoReal(data.foto))
                .catch(() => { });
        };

        fetchFoto(); // primera carga

        const interval = setInterval(fetchFoto, 2000); // refresco automático

        return () => clearInterval(interval);
    }, [user]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">

                <Link to="/" className="navbar-brand">
                    Inicio
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registro" className="nav-link">
                                        Registro
                                    </Link>
                                </li>
                            </>
                        )}

                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link to="/usuario" className="nav-link">
                                        Usuario
                                    </Link>
                                </li>

                                {user.rol === 1 && (
                                    <li className="nav-item">
                                        <Link to="/admin" className="nav-link">
                                            Admin
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>

                    {user && (
                        <div className="d-flex align-items-center gap-3">

                            <span className="text-white fw-semibold">
                                Hola, {user.nombre}
                            </span>

                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${fotoReal || "default.png"}`}
                                alt="Perfil"
                                className="rounded-circle border"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                }}
                            />

                            <button
                                onClick={logout}
                                className="btn btn-outline-light btn-sm"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
