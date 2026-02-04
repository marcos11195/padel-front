import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import bgF4 from "../../assets/img/F4.jpg";

const API = import.meta.env.VITE_API_URL;

const Reservar = () => {
    const { user } = useContext(AuthContext);

    const [fecha, setFecha] = useState("");
    const [pistas, setPistas] = useState([]);
    const [pistaSeleccionada, setPistaSeleccionada] = useState("");
    const [horarios, setHorarios] = useState([]);
    const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
    const [esFinDeSemana, setEsFinDeSemana] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    // Cargar pistas
    useEffect(() => {
        axios.get(`${API}/api/pistas`, auth).then((res) => setPistas(res.data.pistas));
    }, []);

    // Detectar fin de semana
    useEffect(() => {
        if (!fecha) return setEsFinDeSemana(false);
        const dia = new Date(fecha).getDay();
        setEsFinDeSemana(dia === 0 || dia === 6);
    }, [fecha]);

    // Cargar horarios disponibles
    useEffect(() => {
        if (!fecha || !pistaSeleccionada) return;

        axios
            .post(`${API}/api/disponibilidadpista`, { pista_id: pistaSeleccionada, fecha }, auth)
            .then((res) => setHorarios(res.data.disponibilidades));
    }, [fecha, pistaSeleccionada]);

    const toggleHorario = (id) => {
        // Si ya está seleccionado → permitir deseleccionar sin restricciones
        if (horariosSeleccionados.includes(id)) {
            setHorariosSeleccionados(horariosSeleccionados.filter(h => h !== id));
            return;
        }

        const horarioActual = horarios.find(h => h.id === id);
        const [inicioActual, finActual] = horarioActual.franja.split("-");

        // Si no hay horarios seleccionados → permitir siempre
        if (horariosSeleccionados.length === 0) {
            setHorariosSeleccionados([id]);
            return;
        }

        // Obtener el último horario seleccionado (el más reciente)
        const ultimoId = horariosSeleccionados[horariosSeleccionados.length - 1];
        const ultimoHorario = horarios.find(h => h.id === ultimoId);
        const [inicioUltimo, finUltimo] = ultimoHorario.franja.split("-");

        // Validar consecutividad
        if (finUltimo !== inicioActual) {
            alert("Solo puedes seleccionar franjas consecutivas");
            return;
        }

        // Si es consecutivo → añadirlo
        setHorariosSeleccionados([...horariosSeleccionados, id]);
    };


    const confirmarReserva = () => {
        if (!fecha || !pistaSeleccionada || horariosSeleccionados.length === 0) {
            alert("Debes seleccionar fecha, pista y al menos un horario");
            return;
        }

        axios
            .post(
                `${API}/api/reservar`,
                {
                    pista_id: pistaSeleccionada,
                    fecha,
                    horario_ids: horariosSeleccionados
                },
                auth
            )
            .then(() => alert("Reserva realizada correctamente"));
    };

    return (
        <div
            className="container mt-4 p-4"
            style={{
                backgroundImage: `url(${bgF4})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                minHeight: "90vh",
            }}
        >
            {/* OVERLAY */}
            <div
                style={{
                    background: "rgba(0,0,0,0.55)",
                    padding: "25px",
                    borderRadius: "12px",
                    color: "white",
                    animation: "fadeIn 0.8s ease",
                }}
            >
                {/* BANNER SUPERIOR */}
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
                    Bienvenido, {user?.nombre || "Jugador"}
                </div>

                <h3 className="mb-4">Reservar pista</h3>

                {/* FECHA */}
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                {esFinDeSemana && (
                    <div className="alert alert-warning py-2">
                        Se aplicará automáticamente el recargo de fin de semana.
                    </div>
                )}

                {/* PISTA */}
                <div className="mb-3">
                    <label className="form-label">Pista</label>
                    <select
                        className="form-select"
                        value={pistaSeleccionada}
                        onChange={(e) => setPistaSeleccionada(e.target.value)}
                    >
                        <option value="">Selecciona una pista</option>
                        {pistas.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* HORARIOS EN TARJETAS */}
                {horarios.length > 0 && (
                    <div className="mb-3">
                        <label className="form-label">Horarios disponibles</label>

                        <div className="row g-3">
                            {horarios.map((h) => {
                                const seleccionado = horariosSeleccionados.includes(h.id);

                                return (
                                    <div className="col-6 col-md-4" key={h.id}>
                                        <div
                                            onClick={() => toggleHorario(h.id)}
                                            className={`p-3 text-center rounded shadow-sm horario-card ${seleccionado
                                                ? "bg-success text-white"
                                                : "bg-dark text-white bg-opacity-75 border border-light"
                                                }`}
                                            style={{
                                                cursor: "pointer",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <i
                                                className="bi bi-clock-history"
                                                style={{ fontSize: "1.5rem" }}
                                            ></i>
                                            <div className="mt-2">{h.franja}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <button className="btn btn-primary mt-3" onClick={confirmarReserva}>
                    Confirmar reserva
                </button>
            </div>

            {/* ANIMACIONES */}
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .horario-card:hover {
                    transform: scale(1.05);
                }
                `}
            </style>
        </div>
    );
};

export default Reservar;
