import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            setError("Debes iniciar sesión para ver tu panel");
            setLoading(false);
            return;
        }

        const fetchReservas = async () => {
            try {
                const res = await apiFetch("/api/mis_reservas", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!res.ok) {
                    setError("No se pudieron cargar tus reservas");
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setReservas(data.reservas || []);
            } catch (err) {
                setError("Error de conexión con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [user]);

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Cargando tu panel...</p>
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

            <h1 className="mb-2">Bienvenido, {user.nombre}</h1>
            <p className="text-muted mb-4">Email: {user.email}</p>

            <h2 className="mb-3">Mis reservas</h2>

            {reservas.length === 0 && (
                <div className="alert alert-warning">
                    No tienes reservas todavía.
                </div>
            )}

            <div className="row g-3">
                {reservas.map((reserva) => (
                    <div className="col-md-6" key={reserva.id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">

                                <h5 className="card-title mb-3">
                                    Reserva #{reserva.id}
                                </h5>

                                <p className="card-text mb-1">
                                    <strong>Pista:</strong> {reserva.pista_nombre}
                                </p>

                                <p className="card-text mb-1">
                                    <strong>Fecha:</strong> {reserva.fecha}
                                </p>

                                <p className="card-text mb-3">
                                    <strong>Total:</strong> {reserva.total_precio} €
                                </p>

                                <h6 className="fw-bold">Horarios:</h6>
                                <ul className="list-group list-group-flush">
                                    {reserva.horarios.map((h) => (
                                        <li
                                            key={h.horario_reserva_id}
                                            className="list-group-item"
                                        >
                                            {h.franja} ({h.turno}) — {h.precio} €
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default UserDashboard;
