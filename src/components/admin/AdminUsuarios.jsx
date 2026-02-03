import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";

const AdminUsuarios = () => {
    const { user } = useContext(AuthContext);

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        dni: "",
        rol_id: 2,
    });

    const fetchUsuarios = async () => {
        try {
            const res = await apiFetch("/admin/usuarios", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();

            // Normalizamos rol_id a número
            const normalizados = (data.usuarios || []).map(u => ({
                ...u,
                rol_id: Number(u.rol_id)
            }));

            setUsuarios(normalizados);
        } catch {
            setError("Error cargando usuarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const openModal = (u) => {
        setEditUser(u);
        setForm({
            nombre: u.nombre,
            email: u.email,
            dni: u.dni,
            rol_id: Number(u.rol_id),
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditUser(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: name === "rol_id" ? Number(value) : value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const res = await apiFetch(`/admin/usuarios/${editUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            alert("Error guardando usuario");
            return;
        }

        closeModal();
        fetchUsuarios();
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

        const res = await apiFetch(`/admin/usuarios/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            alert("Error eliminando usuario");
            return;
        }

        fetchUsuarios();
    };

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Cargando usuarios...</p>
            </div>
        );

    if (error)
        return <div className="alert alert-danger mt-4 text-center">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Usuarios</h2>

            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>DNI</th>
                            <th>Rol</th>
                            <th style={{ width: "150px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre}</td>
                                <td>{u.email}</td>
                                <td>{u.dni}</td>
                                <td>{u.rol_id === 1 ? "Admin" : "Usuario"}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => openModal(u)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(u.id)}
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
                                <h5 className="modal-title">Editar usuario</h5>
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
                                        <label className="form-label">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">DNI</label>
                                        <input
                                            name="dni"
                                            className="form-control"
                                            value={form.dni}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Rol</label>
                                        <select
                                            name="rol_id"
                                            className="form-select"
                                            value={form.rol_id}
                                            onChange={handleChange}
                                        >
                                            <option value={1}>Admin</option>
                                            <option value={2}>Usuario</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-primary">Guardar cambios</button>
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

export default AdminUsuarios;
