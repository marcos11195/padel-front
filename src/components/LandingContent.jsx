import { useEffect, useState, useContext } from "react";
import { apiFetch } from "../api";
import { AuthContext } from "../context/AuthContext";

const LandingContent = () => {
    const { user, loading } = useContext(AuthContext);
    const [pistas, setPistas] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Esperamos a que AuthContext termine
        if (loading) return;

        // Si no hay usuario → mostramos error
        if (!user) {
            setError("Debes iniciar sesión para ver las pistas");
            return;
        }

        const fetchPistas = async () => {
            try {
                const res = await apiFetch("/api/pistas", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!res.ok) {
                    setError("No se pudieron cargar las pistas");
                    return;
                }

                const data = await res.json();
                setPistas(data.pistas);
            } catch (err) {
                setError("Error de conexión con el servidor");
            }
        };

        fetchPistas();
    }, [user, loading]); // ⬅️ IMPORTANTE

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary" role="status"></div>
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
            {pistas.length === 0 && (
                <div className="alert alert-warning">
                    No hay pistas disponibles.
                </div>
            )}

            <div className="row g-3">
                {pistas.map((pista) => (
                    <div className="col-md-4" key={pista.id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{pista.nombre}</h5>
                                <p className="card-text mb-1">
                                    <strong>Tipo:</strong> {pista.cubierta ? "Cubierta" : "Exterior"}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Plazas:</strong> {pista.plazas}
                                </p>
                                <p className="card-text">
                                    <strong>Precio base:</strong> {pista.precio_base} €
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default LandingContent;
