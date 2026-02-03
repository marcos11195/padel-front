import { useState } from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="d-flex">

            {/* SIDEBAR */}
            <div
                className={`bg-dark text-white p-3 vh-100 shadow-sm`}
                style={{
                    width: open ? "240px" : "70px",
                    transition: "width 0.3s",
                    position: "sticky",
                    top: 0,
                }}
            >
                {/* Toggle */}
                <button
                    className="btn btn-outline-light w-100 mb-3"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "Ocultar" : ">"}
                </button>

                <ul className="nav flex-column">

                    <li className="nav-item mb-2">
                        <Link to="/admin" className="nav-link text-white">
                            {open ? "Dashboard" : "🏠"}
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/admin/pistas" className="nav-link text-white">
                            {open ? "Pistas" : "🎾"}
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/admin/usuarios" className="nav-link text-white">
                            {open ? "Usuarios" : "👤"}
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/admin/horarios" className="nav-link text-white">
                            {open ? "Horarios" : "⏰"}
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/admin/extras" className="nav-link text-white">
                            {open ? "Extras" : "➕"}
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/admin/reservas" className="nav-link text-white">
                            {open ? "Reservas" : "📅"}
                        </Link>
                    </li>

                </ul>
            </div>

            {/* CONTENIDO */}
            <div className="flex-grow-1 p-4">
                {children}
            </div>

        </div>
    );
};

export default AdminLayout;
