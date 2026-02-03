import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await apiFetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                setError("Credenciales incorrectas");
                return;
            }

            const { access_token } = await res.json();

            const meRes = await apiFetch("/auth/me", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            const meData = await meRes.json();

            const userData = {
                id: meData.id,
                nombre: meData.nombre,
                email: meData.email,
                rol: meData.rol_id,
                token: access_token,
            };

            login(userData);
            navigate("/");

        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Iniciar sesión</h2>

                {error && (
                    <div className="alert alert-danger text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Entrar
                    </button>

                    <p className="mt-3 text-center">
                        ¿No tienes cuenta?{" "}
                        <span
                            className="text-primary"
                            style={{ cursor: "pointer", textDecoration: "underline" }}
                            onClick={() => navigate("/registro")}
                        >
                            Regístrate
                        </span>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;
