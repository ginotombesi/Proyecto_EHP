import { Routes, Route, Navigate} from "react-router-dom";
import ActivityList from './Components/Actividades/ActivityList/ActivityList.jsx';
import ReservationPage from "./Components/Actividades/Reservas/ReservationPage.jsx";

function App() {

  return (
    <>
      
      
       
      <Routes>
        <Route path="/" element={<Navigate to="/activities" />} />
        
        
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/reserve/:idActividad" element={<ReservationPage />} />
      </Routes>
    </>
  );
}

export default App;