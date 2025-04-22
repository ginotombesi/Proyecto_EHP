import React from 'react';
import './ActivityCard.css';

const ActivityFilter = ({ filters, onFilterChange, onClear }) => {
  // Generar las horas de 08:00 a 20:00
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 20; hour++) {
      const formattedHour = hour.toString().padStart(2, '0') + ":00";
      times.push(formattedHour);
    }
    return times;
  };

  return (
    <div className="filter-bar">
      <select
        name="name"
        value={filters.name}
        onChange={onFilterChange}
      >
        <option value="">Todas las actividades</option>
        <option value="Safari">Safari</option>
        <option value="Palestra">Palestra</option>
        <option value="Tirolesa">Tirolesa</option>
        <option value="Jardineria">Jardineria</option>
      </select>
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={onFilterChange}
      />
      <select
        name="time"
        value={filters.time}
        onChange={onFilterChange}
      >
        <option value="">Hora</option>
        {generateTimeOptions().map(time => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <button onClick={onClear} className="clear-button">Quitar filtros ❌</button>
    </div>
  );
};

export default ActivityFilter;
