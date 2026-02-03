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
import AdminExtras from "./components/admin/AdminExtras";
import AdminReservas from "./components/admin/AdminReservas";

import UsuarioLayout from "./components/usuario/UsuarioLayout";

// IMPORTS DEL PANEL DE USUARIO
import InicioUsuario from "./pages/usuario/InicioUsuario";   // ⬅️ AÑADIDO
import Reservar from "./pages/usuario/Reservar";
import MisReservas from "./pages/usuario/MisReservas";
import Perfil from "./pages/usuario/Perfil";

import PrivateRoute from "./router/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* USER (rol 1 y rol 2 pueden entrar) */}
        <Route
          path="/usuario"
          element={
            <PrivateRoute role={2}>
              <UsuarioLayout />
            </PrivateRoute>
          }
        >
          {/* Página de inicio del usuario */}
          <Route index element={<InicioUsuario />} />   {/* ⬅️ ACTUALIZADO */}

          {/* Perfil */}
          <Route path="perfil" element={<Perfil />} />

          {/* Reservar */}
          <Route path="reservar" element={<Reservar />} />

          {/* Mis reservas */}
          <Route path="mis-reservas" element={<MisReservas />} />
        </Route>

        {/* ADMIN (solo rol 1) */}
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
          path="/admin/extras"
          element={
            <PrivateRoute role={1}>
              <AdminLayout>
                <AdminExtras />
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
      </Routes>
    </>
  );
}

export default App;
