// src/components/ActivityList.jsx
import React from 'react';
import './ActivityList.css';
import ActivityCard from '../ActivityCard/ActivityCard.jsx';
import Clock from '../ActivityCard/Clock.jsx';
const ActivityList = () => {

  const activities = [
    {
      name: 'Tirolesa',
      time: '10:00 AM',
      endTime: '11:00 AM',
      date: '2025-04-20',
      availableSpots: 5,
      description: 'Sentí la adrenalina mientras te deslizás a gran velocidad por una tirolesa suspendida entre los árboles. Una experiencia emocionante, segura y perfecta para los amantes de la aventura al aire libre.'
    },
    {
      name: 'Safari',
      time: '11:30 AM',
      endTime: '12:30 PM',
      date: '2025-04-20',
      availableSpots: 8,
      description: 'Subite a un vehículo todo terreno y descubrí la fauna silvestre en su hábitat natural. Ideal para toda la familia, este safari guiado combina aventura, educación y contacto con la naturaleza.'
    },
    {
      name: 'Palestra',
      time: '1:00 PM',
      endTime: '2:00 PM',
      date: '2025-04-20',
      availableSpots: 6,
      description: 'Poné a prueba tu fuerza y destreza escalando nuestro muro de palestra con distintos niveles de dificultad. Supervisión constante de instructores calificados para garantizar seguridad y diversión.'
    },
    {
      name: 'Jardineria',
      time: '3:00 PM',
      endTime: '4:00 PM',
      date: '2025-04-20',
      availableSpots: 10,
      description: 'Disfrutá de un paseo relajante en un carro tipo jardinera por senderos llenos de color y aromas naturales. Una actividad tranquila pensada para grandes y chicos, con vistas espectaculares.'
    },
  ];

  return (
    <div className="activity-list-container">
      <Clock />
      <h2 className="activity-title">Actividades Activas</h2>
      {activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;