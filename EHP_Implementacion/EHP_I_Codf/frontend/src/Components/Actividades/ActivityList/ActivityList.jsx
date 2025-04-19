// src/components/ActivityList.jsx
import React, { useEffect, useState } from 'react';
import './ActivityList.css';
import ActivityCard from '../ActivityCard/ActivityCard.jsx';
import Clock from '../ActivityCard/Clock.jsx';
import { obtenerActividades } from '../../../api.js';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await obtenerActividades();
        // Asegurate que los nombres de campos coincidan con lo que devuelve tu backend
        const data = response.data.map((actividad) => ({
          name: actividad.tipoActividad.descripcion  || "No tiene Nombre",
          time: actividad.horaInicio || 'Sin Hora Inicio',
          endTime: actividad.horaFin || 'sin Hora Fin',
          date: actividad.fecha || 'sin Fecha',
          availableSpots: actividad.cupo || 0,
          estaActiva : actividad.activa, //se supone que siempre es 1 o 0
          idTipoActividad : actividad.tipoActividadId || 0,
          necesitaTalle : actividad.tipoActividad.requiereVest || 2, //se supone que siempre es 1 o 0
          descripcion: actividad.descripcion || 'Disfruta la experiencia.',
        }));
        
        setActivities(data);
      } catch (error) {
        console.error('Error al obtener actividades:', error);
      }
    };

    fetchActividades();
  }, []);

  return (
    <div className="activity-list-container">
      <Clock />
      
      <h2 className="activity-title">Actividades Activas</h2>
      {activities.length === 0 ? (
        <p>Cargando actividades...</p>
      
      ) : (
        activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
          
        ))
      )}
    </div>
  );
};

export default ActivityList;
