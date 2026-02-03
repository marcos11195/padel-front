import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        dni: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [ok, setOk] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setOk("");

        try {
            const res = await apiFetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Error al registrar");
                return;
            }

            setOk("Registro completado. Ahora puedes iniciar sesión.");
            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card shadow-sm p-4" style={{ maxWidth: "450px", width: "100%" }}>
                <h2 className="text-center mb-4">Registro</h2>

                {error && (
                    <div className="alert alert-danger text-center">{error}</div>
                )}

                {ok && (
                    <div className="alert alert-success text-center">{ok}</div>
                )}

                <form onSubmit={handleSubmit}>

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
                        <label className="form-label">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Registrarse
                    </button>

                    <p className="mt-3 text-center">
                        ¿Ya tienes cuenta?{" "}
                        <span
                            className="text-primary"
                            style={{ cursor: "pointer", textDecoration: "underline" }}
                            onClick={() => navigate("/login")}
                        >
                            Inicia sesión
                        </span>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Register;
