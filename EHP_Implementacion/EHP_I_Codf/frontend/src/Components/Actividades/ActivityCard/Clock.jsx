import React, { useEffect, useState } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('es-AR', { hour12: false });

  return (
    <div className="digital-clock">
      {formatTime(time)}
    </div>
  );
};

export default Clock;