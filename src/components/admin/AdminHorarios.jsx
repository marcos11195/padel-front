import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";

const AdminHorarios = () => {
    const { user } = useContext(AuthContext);

    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [editHorario, setEditHorario] = useState(null);

    const [form, setForm] = useState({
        franja: "",
        turno: "",
    });

    // ============================
    // FETCH HORARIOS (GET)
    // ============================
    const fetchHorarios = async () => {
        try {
            const res = await apiFetch("/api/horarios");

            if (!res.ok) throw new Error();

            const data = await res.json();
            setHorarios(data.horarios || []);
        } catch {
            setError("Error cargando horarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHorarios();
    }, []);

    // ============================
    // FORM HANDLERS
    // ============================
    const openModal = (h = null) => {
        if (h) {
            setEditHorario(h);
            setForm({
                franja: h.franja,
                turno: h.turno,
            });
        } else {
            setEditHorario(null);
            setForm({ franja: "", turno: "" });
        }

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditHorario(null);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ============================
    // SAVE (POST / PUT)
    // ============================
    const handleSave = async (e) => {
        e.preventDefault();

        const method = editHorario ? "PUT" : "POST";
        const url = editHorario
            ? `/admin/horarios/${editHorario.id}`
            : "/admin/horarios";

        const res = await apiFetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            alert("Error guardando horario");
            return;
        }

        closeModal();
        fetchHorarios();
    };

    // ============================
    // DELETE
    // ============================
    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar este horario?")) return;

        const res = await apiFetch(`/admin/horarios/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            alert("Error eliminando horario");
            return;
        }

        fetchHorarios();
    };

    // ============================
    // RENDER
    // ============================
    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Cargando horarios...</p>
            </div>
        );

    if (error)
        return <div className="alert alert-danger mt-4 text-center">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Horarios</h2>

            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Crear horario
            </button>

            {/* TABLA */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Franja</th>
                            <th>Turno</th>
                            <th style={{ width: "150px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {horarios.map((h) => (
                            <tr key={h.id}>
                                <td>{h.id}</td>
                                <td>{h.franja}</td>
                                <td>{h.turno}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => openModal(h)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(h.id)}
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content shadow">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editHorario ? "Editar horario" : "Crear horario"}
                                </h5>
                                <button className="btn-close" onClick={closeModal}></button>
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label className="form-label">Franja</label>
                                        <input
                                            name="franja"
                                            className="form-control"
                                            value={form.franja}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Turno</label>
                                        <select
                                            name="turno"
                                            className="form-select"
                                            value={form.turno}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecciona turno</option>
                                            <option value="mañana">Mañana</option>
                                            <option value="tarde">Tarde</option>
                                            <option value="noche">Noche</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-primary">
                                        {editHorario ? "Guardar cambios" : "Crear horario"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                    >
                                        Cancelar
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHorarios;
