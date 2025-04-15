
// src/App.jsx
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Register from "./Components/Registro/Register.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Login from "./Components/InicioSesion/Login.jsx";
import ActivityList from './Components/Actividades/ActivityList/ActivityList.jsx';
import ReservationPage from "./Components/Actividades/Reservas/ReservationPage.jsx";

//import { useLocation } from "react-router-dom";
function App() {
  //const location = useLocation();
  //const hideNavbarRoutes = ["/reserve","/activities"];
  return (
    <Router>

      {<Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/reserve" element={<ReservationPage />}/>
      </Routes>
      
    </Router>
  );
}

export default App;
