import { Outlet } from "react-router-dom";
import SidebarUsuario from "./SidebarUsuario";

const UsuarioLayout = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <SidebarUsuario />

            {/* Contenido */}
            <main className="flex-grow-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default UsuarioLayout;
