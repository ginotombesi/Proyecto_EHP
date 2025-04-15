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
      description: 'Deslízate en una tirolesa entre árboles.'
    },
    {
      name: 'Safari',
      time: '11:30 AM',
      endTime: '12:30 PM',
      date: '2025-04-20',
      availableSpots: 8,
      description: 'Paseo en vehículo todo terreno observando animales.'
    },
    {
      name: 'Palestra',
      time: '1:00 PM',
      endTime: '2:00 PM',
      date: '2025-04-20',
      availableSpots: 6,
      description: 'Escalada en muro con supervisión profesional.'
    },
    {
      name: 'Jardinera',
      time: '3:00 PM',
      endTime: '4:00 PM',
      date: '2025-04-20',
      availableSpots: 10,
      description: 'Paseo en carro tipo jardinera para toda la familia.'
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