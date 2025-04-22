// src/components/ActivityFilter.jsx
import React from 'react';
import './ActivityCard.css';

const ActivityFilter = ({ filters, onFilterChange, onClear }) => {
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
        <option value="Caminata">Caminata</option>
        <option value="Visita guiada">Visita guiada</option>
      </select>
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={onFilterChange}
      />
      <input
        type="time"
        name="time"
        value={filters.time}
        onChange={onFilterChange}
      />
      <button onClick={onClear} className="clear-button">Quitar filtros ❌</button>
    </div>
  );
};

export default ActivityFilter;
