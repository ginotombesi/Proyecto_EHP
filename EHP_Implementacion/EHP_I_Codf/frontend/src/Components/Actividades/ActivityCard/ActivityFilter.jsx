// src/components/ActivityFilter.jsx
import React from 'react';
import './ActivityCard.css';

const ActivityFilter = ({ filters, onFilterChange, onClear }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Nombre (Safari, Palestra...)"
        name="name"
        value={filters.name}
        onChange={onFilterChange}
      />
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
