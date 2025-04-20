// src/components/ActivityCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActivityCard.css';

const ActivityCard = ({ activity }) => {
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();
 

  const handleReserve = () => {
    navigate('/reserve', { state: { activity } });
  };

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };
//imagenes//
// Determinar la clase de la imagen según el tipo de actividad
  const getActivityImageClass = (typeId) => {

    switch (typeId) {
      case 1:
        return 'Safari';
      case 2:
        return 'Palestra';
      case 3:
        return 'Jardineria';
      case 4:
        return 'Tirolesa';
      default:
        return ''; // Si no coincide con ninguno, no aplica ninguna clase
    }
  };

  const imageClass = getActivityImageClass(activity.idTipoActividad);

  
  return (
    <div className={`activity-card ${imageClass}`}>
      <div className="activity-header">
      <h3>
            {activity.name}
      </h3>
        <button className="toggle-description" onClick={toggleDescription}>
          {showDescription ? '▲ Ocultar' : '▼ Ver más'}
        </button>
      </div>

      <div className="activity-details">
        <p><strong>📅 Fecha:</strong> {activity.date}</p>
        <p><strong>🕒 Inicio:</strong> {activity.time}</p>
        <p><strong>🕔 Fin:</strong> {activity.endTime}</p>
        <p><strong>🎟️ Cupos:</strong> {activity.availableSpots}</p>
      </div>

      {showDescription && (
        <div className="activity-description">
          <p>{activity.descripcion}</p>
        </div>
      )}

      <div className="activity-footer">
        <button 
        className="reserve-button" 
        onClick={handleReserve}
        disabled={activity.estaActiva === 0}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;




