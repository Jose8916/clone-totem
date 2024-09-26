import React, { useEffect, useState } from 'react';

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(null);

  useEffect(() => {
    const fetchCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convierte las horas en formato de 12 horas
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;
      const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
      setCurrentDateTime({ currentDate, currentTime });
    };

    fetchCurrentDateTime();
    const interval = setInterval(fetchCurrentDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}>
      <h2 style={{fontSize: "18px"}}>Hora y fecha actual</h2>
      {currentDateTime && (
        <>
        <div>
        <p>{currentDateTime.currentDate}</p>
          <p>{currentDateTime.currentTime}</p>
        </div>
        </>
      )}
    </div>
  );
};

export default CurrentDateTime;
``
