import React, { useEffect, useState } from 'react';
import './ActivityList.css';
import ActivityCard from '../ActivityCard/ActivityCard.jsx';
import Clock from '../ActivityCard/Clock.jsx';
import { obtenerActividades } from '../../../api.js';
import ActivityFilter from '../ActivityCard/ActivityFilter.jsx';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({ name: '', date: '', time: '' });

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await obtenerActividades();
        const data = response.data.map((actividad) => ({
          id: actividad.idActividad,
          name: actividad.tipoActividad.descripcion || "No tiene Nombre",
          time: actividad.horaInicio || '00:00',
          endTime: actividad.horaFin || '00:00',
          date: actividad.fecha || '2025-01-01',
          availableSpots: actividad.cupo || 0,
          estaActiva: actividad.activa,
          idTipoActividad: actividad.tipoActividadId || 0,
          necesitaTalle: actividad.tipoActividad.requiereVest || 2,
          descripcion: actividad.descripcion || 'Disfrutá la experiencia.',
        }));

        setActivities(data);
      } catch (error) {
        console.error('Error al obtener actividades:', error);
      }
    };

    fetchActividades();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({ name: '', date: '', time: '' });
  };

  const parseDate = (str) => {
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const filterActivities = (list) => {
    return list.filter((act) => {
      const matchName = act.name.toLowerCase().includes(filters.name.toLowerCase());

      const matchDate = filters.date
        ? parseDate(act.date).toDateString() === new Date(filters.date).toDateString()
        : true;

      const matchTime = filters.time ? act.time === filters.time : true;

      return matchName && matchDate && matchTime;
    });
  };

  const formatDateTime = (date, time) => {
    const [day, month, year] = date.split('/');
    const [hours, minutes] = time.split(':');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
  };

  const separateByTime = (list) => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const future = [], past = [];

    list.forEach((act) => {
      const dt = formatDateTime(act.date, act.time);
      dt.setSeconds(0);
      dt.setMilliseconds(0);

      if (dt.getTime() >= now.getTime()) {
        future.push({ ...act, dt });
      } else {
        past.push({ ...act, dt });
      }
    });

    const sortByPriority = (a, b) => {
      const aHasSpots = a.availableSpots > 0;
      const bHasSpots = b.availableSpots > 0;

      if (aHasSpots && !bHasSpots) return -1;
      if (!aHasSpots && bHasSpots) return 1;

      // Si ambos tienen (o no tienen) cupos, ordenar por fecha/hora
      return a.dt - b.dt;
    };

    return {
      future: future.sort(sortByPriority).map(({ dt, ...rest }) => rest),
      past: past.sort((a, b) => a.dt - b.dt).map(({ dt, ...rest }) => rest),
    };
  };

  const filtered = filterActivities(activities);
  const { future, past } = separateByTime(filtered);

  return (
    <div className="activity-list-container">
      <Clock />
      <h2 className="activity-title">Actividades Activas</h2>

      <ActivityFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      {future.length === 0 && past.length === 0 ? (
        <p style={{ color: 'white' }}>No se encontraron actividades con esos filtros.</p>
      ) : (
        <>
          {future.map((activity, index) => (
            <ActivityCard key={`fut-${index}`} activity={activity} isPast={false} />
          ))}

          {past.length > 0 && (
            <>
              <hr style={{ margin: '2rem 0', borderColor: '#aaa', width: '80%' }} />
              <h3 style={{ color: 'white', textAlign: 'center' }}>Actividades Pasadas</h3>
              {past.map((activity, index) => (
                <ActivityCard key={`past-${index}`} activity={activity} isPast={true} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ActivityList;
