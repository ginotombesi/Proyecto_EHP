import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Register from "./Components/Registro/Register.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Login from "./Components/InicioSesion/Login.jsx";
import ActivityList from './Components/Actividades/ActivityList/ActivityList.jsx';
import ReservationPage from "./Components/Actividades/Reservas/ReservationPage.jsx";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register","/reserve"]; // Ocultamos el Navbar SOLO en login y register
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldHideNavbar && <Navbar />}
      {shouldHideNavbar && <Navbar />}{/* aca va el Navbar del resto. (capas no hace falta...) */}
       
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/reserve" element={<ReservationPage />} />
      </Routes>
    </>
  );
}

export default App;