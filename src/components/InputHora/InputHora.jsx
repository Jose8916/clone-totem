import { useEffect, useState } from 'react';
  import { Calendar } from 'primereact/calendar';

  function InputHora( {setHours} ) {
    const [timeIni, setTimeIni] = useState(null);
    const [timeFin, setTimeFin] = useState(null);

    const handleTimeIni = (time) => {
      setTimeIni(time);
    }

    const handleTimeFin = (time) => {
      setTimeFin(time);  
    }

    useEffect(()=>{

      setHours({
        
      })

    },[timeIni, timeFin])

    return (
      <>
        <Calendar  
          value={timeIni} 
          onChange={handleTimeIni} 
          timeOnly 
          id="inicio" />

        <Calendar
          value={timeFin}
          onChange={handleTimeFin}  
          timeOnly
          id="fin" />      
      </>
    );
  }

  export default InputHora;