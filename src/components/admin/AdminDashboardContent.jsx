import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";

const AdminDashboardContent = () => {
    const { user } = useContext(AuthContext);

    const [pistas, setPistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user || user.rol !== 1) {
            setError("Acceso denegado. Solo administradores.");
            setLoading(false);
            return;
        }

        const fetchPistas = async () => {
            try {
                const res = await apiFetch("/api/pistas", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!res.ok) {
                    setError("No se pudieron cargar las pistas");
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setPistas(data.pistas || []);
            } catch (err) {
                setError("Error de conexión con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchPistas();
    }, [user]);

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Cargando panel de administrador...</p>
            </div>
        );

    if (error)
        return (
            <div className="alert alert-danger mt-4 text-center">
                {error}
            </div>
        );

    return (
        <div className="container mt-4">

            <h1 className="mb-3">Panel de Administrador</h1>
            <p className="lead">Bienvenido, <strong>{user.nombre}</strong></p>

            <h2 className="mt-4 mb-3">Pistas</h2>

            {pistas.length === 0 && (
                <div className="alert alert-warning">
                    No hay pistas registradas.
                </div>
            )}

            {pistas.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cubierta</th>
                                <th>Plazas</th>
                                <th>Precio Base</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pistas.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.cubierta ? "Sí" : "No"}</td>
                                    <td>{p.plazas}</td>
                                    <td>{p.precio_base} €</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default AdminDashboardContent;
