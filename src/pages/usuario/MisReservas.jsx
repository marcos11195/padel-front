import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";
import bgF1 from "../../assets/img/F1.jpg";

const MisReservas = () => {
    const { user } = useContext(AuthContext);

    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [detalle, setDetalle] = useState(null);

    const fetchReservas = async () => {
        try {
            const res = await apiFetch("/api/mis_reservas", {
                headers: { Authorization: `Bearer ${user.token}` },
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

    const cancelarReserva = async (id) => {
        if (!confirm("¿Seguro que quieres cancelar esta reserva?")) return;

        const res = await apiFetch("/api/cancelar_reserva", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reserva_id: id }),
        });

        if (!res.ok) {
            alert("Error cancelando reserva");
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
        <div
            className="container mt-4 p-4"
            style={{
                backgroundImage: `url(${bgF1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                minHeight: "90vh",
            }}
        >
            <div
                style={{
                    background: "rgba(0,0,0,0.55)",
                    padding: "25px",
                    borderRadius: "12px",
                    color: "white",
                    animation: "fadeIn 0.8s ease",
                }}
            >
                {/* BANNER */}
                <div
                    className="mb-4 p-3 text-center"
                    style={{
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: "10px",
                        backdropFilter: "blur(3px)",
                        fontSize: "1.4rem",
                        fontWeight: "600",
                    }}
                >
                    Tus reservas, {user?.nombre || "Jugador"}
                </div>

                <h2 className="mb-4">Mis Reservas</h2>

                <div className="table-responsive">
                    <table className="table table-dark table-striped table-bordered align-middle shadow">
                        <thead className="table-light text-dark">
                            <tr>
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
                                            onClick={() => cancelarReserva(r.id)}
                                        >
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MODAL */}
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

            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </div>
    );
};

export default MisReservas;
