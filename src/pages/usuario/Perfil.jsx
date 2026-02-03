import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api";
import bgF3 from "../../assets/img/F3.jpg";

const Perfil = () => {
    const { user } = useContext(AuthContext);

    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editNombre, setEditNombre] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editDni, setEditDni] = useState("");

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");

    const [nuevaFoto, setNuevaFoto] = useState(null);
    const [subiendo, setSubiendo] = useState(false);

    const fetchPerfil = async () => {
        try {
            const res = await apiFetch("/auth/me", {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            setPerfil(data);

            setEditNombre(data.nombre);
            setEditEmail(data.email);
            setEditDni(data.dni);

        } catch {
            setError("Error cargando perfil");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerfil();
    }, []);

    const guardarCambios = async () => {
        const res = await apiFetch("/auth/update_profile", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: editNombre,
                email: editEmail,
                dni: editDni,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            alert(err.error || "Error actualizando perfil");
            return;
        }

        alert("Perfil actualizado");
        fetchPerfil();
    };

    const cambiarPassword = async () => {
        const res = await apiFetch("/auth/change_password", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                old_password: oldPass,
                new_password: newPass,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Error cambiando contraseña");
            return;
        }

        alert("Contraseña actualizada");
        setOldPass("");
        setNewPass("");
    };

    const subirFoto = async () => {
        if (!nuevaFoto) return;

        const formData = new FormData();
        formData.append("foto", nuevaFoto);

        setSubiendo(true);

        const res = await apiFetch("/auth/update_image_profile", {
            method: "POST",
            headers: { Authorization: `Bearer ${user.token}` },
            body: formData,
        });

        setSubiendo(false);

        if (!res.ok) {
            alert("Error subiendo imagen");
            return;
        }

        alert("Foto actualizada");
        fetchPerfil();
    };

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Cargando perfil...</p>
            </div>
        );

    if (error)
        return <div className="alert alert-danger mt-4 text-center">{error}</div>;

    return (
        <div
            className="container mt-4 p-4"
            style={{
                backgroundImage: `url(${bgF3})`,
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
                    Tu perfil, {user?.nombre || "Jugador"}
                </div>

                <div className="card shadow-lg" style={{ backdropFilter: "blur(4px)" }}>
                    <div className="card-body">

                        <div className="text-center mb-4">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${perfil.foto || "default.png"}`}
                                alt="Foto de perfil"
                                className="rounded-circle border"
                                style={{ width: "140px", height: "140px", objectFit: "cover" }}
                            />

                            <div className="mt-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setNuevaFoto(e.target.files[0])}
                                />
                                <button
                                    className="btn btn-primary mt-2"
                                    disabled={subiendo}
                                    onClick={subirFoto}
                                >
                                    {subiendo ? "Subiendo..." : "Actualizar foto"}
                                </button>
                            </div>
                        </div>

                        <h5>Datos personales</h5>

                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editNombre}
                                onChange={(e) => setEditNombre(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">DNI</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editDni}
                                onChange={(e) => setEditDni(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-success mb-4" onClick={guardarCambios}>
                            Guardar cambios
                        </button>

                        <hr />

                        <h5>Cambiar contraseña</h5>

                        <div className="mb-3">
                            <label className="form-label">Contraseña actual</label>
                            <input
                                type="password"
                                className="form-control"
                                value={oldPass}
                                onChange={(e) => setOldPass(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nueva contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-warning" onClick={cambiarPassword}>
                            Cambiar contraseña
                        </button>

                    </div>
                </div>
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

export default Perfil;
