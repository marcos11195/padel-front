import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Zona Usuario</h1>
            <p>Hola, {user?.nombre}</p>


            <LogoutButton />
        </div>
    );
};

export default UserDashboard;
