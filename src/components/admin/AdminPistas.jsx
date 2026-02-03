import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";

const AdminPistas = () => {
    const { user } = useContext(AuthContext);

    const [pistas, setPistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Formulario
    const [form, setForm] = useState({
        nombre: "",
        cubierta: false,
        plazas: "",
        precio_base: "",
    });

    const [editId, setEditId] = useState(null);

    const fetchPistas = async () => {
        try {
            const res = await apiFetch("/api/pistas", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            setPistas(data.pistas || []);
        } catch {
            setError("Error cargando pistas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPistas();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const resetForm = () => {
        setEditId(null);
        setForm({
            nombre: "",
            cubierta: false,
            plazas: "",
            precio_base: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editId ? "PUT" : "POST";
        const url = editId ? `/admin/pistas/${editId}` : "/admin/pistas";

        const res = await apiFetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            alert("Error guardando pista");
            return;
        }

        resetForm();
        fetchPistas();
    };

    const handleEdit = (p) => {
        setEditId(p.id);
        setForm({
            nombre: p.nombre,
            cubierta: p.cubierta,
            plazas: p.plazas,
            precio_base: p.precio_base,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar esta pista?")) return;

        const res = await apiFetch(`/admin/pistas/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            alert("Error eliminando pista");
            return;
        }

        fetchPistas();
    };

    // ============================
    // RENDER
    // ============================

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Cargando pistas...</p>
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

            <h2 className="mb-4">Gestión de Pistas</h2>

            {/* FORMULARIO */}
            <div className="card shadow-sm mb-4">
                <div className="card-header fw-bold">
                    {editId ? "Editar pista" : "Crear pista"}
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Plazas</label>
                            <input
                                type="number"
                                name="plazas"
                                className="form-control"
                                value={form.plazas}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Precio base (€)</label>
                            <input
                                type="number"
                                name="precio_base"
                                className="form-control"
                                value={form.precio_base}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-12 form-check mt-2">
                            <input
                                type="checkbox"
                                name="cubierta"
                                className="form-check-input"
                                checked={form.cubierta}
                                onChange={handleChange}
                            />
                            <label className="form-check-label ms-1">Cubierta</label>
                        </div>

                        <div className="col-12 mt-3">
                            <button className="btn btn-primary">
                                {editId ? "Guardar cambios" : "Crear pista"}
                            </button>

                            {editId && (
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={resetForm}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>

            {/* TABLA */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cubierta</th>
                            <th>Plazas</th>
                            <th>Precio base</th>
                            <th style={{ width: "150px" }}>Acciones</th>
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
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(p)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AdminPistas;
