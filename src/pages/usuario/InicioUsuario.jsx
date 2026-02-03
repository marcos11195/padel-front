import padelImg from "../../assets/img/pista.jpg";
import "./InicioUsuario.css";

const InicioUsuario = () => {
    return (
        <div className="inicio-usuario-container" style={{ backgroundImage: `url(${padelImg})` }} >
            <div className="inicio-overlay">
                <h1 className="inicio-title">Bienvenido a tu zona de jugador</h1>
                <p className="inicio-subtitle">
                    Reserva, juega, mejora. El pádel empieza aquí.
                </p>
            </div>
        </div>
    );
};

export default InicioUsuario;
