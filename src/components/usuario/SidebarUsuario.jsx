import { Link, useLocation } from "react-router-dom";

const SidebarUsuario = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-light border-end vh-100 p-3" style={{ width: "250px" }}>
            <h4 className="mb-4">Usuario</h4>

            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <Link
                        to="/usuario"
                        className={`nav-link ${isActive("/usuario") ? "fw-bold text-primary" : ""}`}
                    >
                        Inicio
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        to="/usuario/reservar"
                        className={`nav-link ${isActive("/usuario/reservar") ? "fw-bold text-primary" : ""}`}
                    >
                        Reservar
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        to="/usuario/mis-reservas"
                        className={`nav-link ${isActive("/usuario/mis-reservas") ? "fw-bold text-primary" : ""}`}
                    >
                        Mis reservas
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        to="/usuario/perfil"
                        className={`nav-link ${isActive("/usuario/perfil") ? "fw-bold text-primary" : ""}`}
                    >
                        Perfil
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarUsuario;
