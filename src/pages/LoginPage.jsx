import Login from "../components/Login";
import juegoImg from "../assets/img/juego.jpg";

const LoginPage = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${juegoImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "rgba(0,0,0,0.55)",
                    padding: "40px",
                    borderRadius: "12px",
                    width: "100%",
                    maxWidth: "420px",
                    color: "white",
                    backdropFilter: "blur(4px)",
                    animation: "fadeIn 0.8s ease",
                }}
            >
                <h2 className="text-center mb-4">Iniciar sesión</h2>

                <Login />
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

export default LoginPage;
