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

  return (
    <div className={`activity-card ${activity.name}`}>
      <div className="activity-header">
        <h3>{activity.name}</h3>
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
          <p>{activity.description}</p>
        </div>
      )}

      <div className="activity-footer">
        <button className="reserve-button" onClick={handleReserve}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;




