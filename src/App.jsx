import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardContent from "./components/admin/AdminDashboardContent";
import AdminPistas from "./components/admin/AdminPistas";
import AdminUsuarios from "./components/admin/AdminUsuarios";
import AdminHorarios from "./components/admin/AdminHorarios";
import AdminReservas from "./components/admin/AdminReservas";

import UsuarioLayout from "./components/usuario/UsuarioLayout";

import InicioUsuario from "./pages/usuario/InicioUsuario";
import Reservar from "./pages/usuario/Reservar";
import MisReservas from "./pages/usuario/MisReservas";
import Perfil from "./pages/usuario/Perfil";

import PrivateRoute from "./router/PrivateRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* USER */}
        <Route
          path="/usuario"
          element={
            <PrivateRoute role={2}>
              <UsuarioLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<InicioUsuario />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="reservar" element={<Reservar />} />
          <Route path="mis-reservas" element={<MisReservas />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role={1}>
              <AdminLayout>
                <AdminDashboardContent />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/pistas"
          element={
            <PrivateRoute role={1}>
              <AdminLayout>
                <AdminPistas />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute role={1}>
              <AdminLayout>
                <AdminUsuarios />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/horarios"
          element={
            <PrivateRoute role={1}>
              <AdminLayout>
                <AdminHorarios />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/reservas"
          element={
            <PrivateRoute role={1}>
              <AdminLayout>
                <AdminReservas />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
