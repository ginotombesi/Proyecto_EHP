// src/components/ActivityCard.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
//import ReservationModal from '../Reservas/ReservationPage.jsx';
import './ActivityCard.css';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();
  const handleReserve = () => {
        navigate('/reserve', { state: { activity } });
  }

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  

  return (
    <div className="activity-card">
      <div className="activity-info-row">
        <h3>{activity.name}</h3>
        <p><strong>Fecha:</strong> {activity.date}</p>
        <p><strong>Hora:</strong> {activity.time}</p>
        <p><strong>Fin:</strong> {activity.endTime}</p>
        <p><strong>Cupos disponibles:</strong> {activity.availableSpots}</p>
        <button className="reserve-button" onClick={handleReserve}>Reservar</button>
        <button className="toggle-description" onClick={toggleDescription}>
          {showDescription ? '▲' : '▼'}
        </button>
      </div>

      {showDescription && (
        <p className="activity-description">{activity.description}</p>
      )}
    </div>
  );
};


export default ActivityCard;
