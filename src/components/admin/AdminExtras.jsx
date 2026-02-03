import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";

const AdminExtras = () => {
    const { user } = useContext(AuthContext);

    const [extras, setExtras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [editExtra, setEditExtra] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
    });

    const fetchExtras = async () => {
        try {
            const res = await apiFetch("/admin/extras", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            setExtras(data.extras || []);
        } catch {
            setError("Error cargando extras");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExtras();
    }, []);

    const openModal = (extra = null) => {
        if (extra) {
            setEditExtra(extra);
            setForm({
                nombre: extra.nombre,
                precio: extra.precio_extra,   // ← CORREGIDO
                descripcion: extra.descripcion || "",
            });
        } else {
            setEditExtra(null);
            setForm({ nombre: "", precio: "", descripcion: "" });
        }

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditExtra(null);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const method = editExtra ? "PUT" : "POST";
        const url = editExtra
            ? `/admin/extras/${editExtra.id}`
            : "/admin/extras";

        const res = await apiFetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                nombre: form.nombre,
                precio_extra: form.precio,     // ← CORREGIDO
                descripcion: form.descripcion,
            }),
        });

        if (!res.ok) {
            alert("Error guardando extra");
            return;
        }

        closeModal();
        fetchExtras();
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar este extra?")) return;

        const res = await apiFetch(`/admin/extras/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            alert("Error eliminando extra");
            return;
        }

        fetchExtras();
    };

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Cargando extras...</p>
            </div>
        );

    if (error)
        return <div className="alert alert-danger mt-4 text-center">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Extras</h2>

            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Crear extra
            </button>

            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th style={{ width: "150px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {extras.map((extra) => (
                            <tr key={extra.id}>
                                <td>{extra.id}</td>
                                <td>{extra.nombre}</td>
                                <td>{extra.precio_extra} €</td> {/* ← CORREGIDO */}
                                <td>{extra.descripcion}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => openModal(extra)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(extra.id)}
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
                                    {editExtra ? "Editar extra" : "Crear extra"}
                                </h5>
                                <button className="btn-close" onClick={closeModal}></button>
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            name="nombre"
                                            className="form-control"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Precio (€)</label>
                                        <input
                                            name="precio"
                                            type="number"
                                            className="form-control"
                                            value={form.precio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <textarea
                                            name="descripcion"
                                            className="form-control"
                                            rows="3"
                                            value={form.descripcion}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-primary">
                                        {editExtra ? "Guardar cambios" : "Crear extra"}
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

export default AdminExtras;
