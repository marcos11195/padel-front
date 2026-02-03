import LandingContent from "../components/LandingContent";
import pistaImg from "../assets/img/padel.jpg";

const Landing = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${pistaImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "40px",
                color: "white"
            }}
        >
            <h1>Pistas Disponibles</h1>


            <LandingContent />
        </div>
    );
};

export default Landing;
