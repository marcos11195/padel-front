import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";

const AdminReservas = () => {
    const { user } = useContext(AuthContext);

    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Modal detalle
    const [showModal, setShowModal] = useState(false);
    const [detalle, setDetalle] = useState(null);

    const fetchReservas = async () => {
        try {
            const res = await apiFetch("/admin/reservas", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            setReservas(data.reservas || []);
        } catch {
            setError("Error cargando reservas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const openModal = (reserva) => {
        setDetalle(reserva);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setDetalle(null);
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar esta reserva?")) return;

        const res = await apiFetch(`/admin/reservas/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            alert("Error eliminando reserva");
            return;
        }

        fetchReservas();
    };

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Cargando reservas...</p>
            </div>
        );

    if (error)
        return <div className="alert alert-danger mt-4 text-center">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Reservas</h2>

            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Usuario</th>
                            <th>Pista</th>
                            <th>Horarios</th>
                            <th>Fecha</th>
                            <th>Precio</th>
                            <th style={{ width: "150px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservas.map((r) => (
                            <tr key={r.id}>
                                <td>{r.usuario_nombre}</td>
                                <td>{r.pista_nombre}</td>
                                <td>{r.horarios.map(h => h.franja).join(", ")}</td>
                                <td>{r.fecha}</td>
                                <td>{r.total_precio} €</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => openModal(r)}
                                    >
                                        Ver
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(r.id)}
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL DETALLE */}
            {showModal && detalle && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content shadow">

                            <div className="modal-header">
                                <h5 className="modal-title">Detalle de la reserva</h5>
                                <button className="btn-close" onClick={closeModal}></button>
                            </div>

                            <div className="modal-body">

                                <h5 className="mb-3">Información general</h5>

                                <ul className="list-group mb-4">
                                    <li className="list-group-item">
                                        <strong>Usuario:</strong> {detalle.usuario_nombre} ({detalle.usuario_email})
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Pista:</strong> {detalle.pista_nombre}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Horarios:</strong>{" "}
                                        {detalle.horarios
                                            .map(h => `${h.franja} (${h.turno})`)
                                            .join(", ")}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Fecha:</strong> {detalle.fecha}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Precio total:</strong> {detalle.total_precio} €
                                    </li>
                                </ul>

                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>
                                    Cerrar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReservas;
