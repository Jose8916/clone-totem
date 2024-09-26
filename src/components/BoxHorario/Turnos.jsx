import { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import styled from './Turnos.module.css';

const initialHours = [
  {
    type: 1,
    range_1: "",
    price_1: "",
    range_2: "",
    price_2: "",
    range_3: "",
    price_3: "",
    start_date: null,
    end_date: null
  },
  {
    type: 2,
    range_1: "",
    price_1: "",
    range_2: "",
    price_2: "",
    range_3: "",
    price_3: "",
    start_date: null,
    end_date: null
  },
  {
    type: 3,
    range_1: "",
    price_1: "",
    range_2: "",
    price_2: "",
    range_3: "",
    price_3: "",
    start_date: null,
    end_date: null
  },
  {
    type: 4,
    range_1: "",
    price_1: "",
    range_2: "",
    price_2: "",
    range_3: "",
    price_3: "",
    start_date: null,
    end_date: null
  },
];

function Turnos({ setTurnos, turnos }) {
  const [time, setTime] = useState(initialHours);

  const handleStartDateChange = (turnId, value) => {
    const formattedDate = value ? value.toISOString() : null;
    setTime(prevState => {
      const updatedTime = prevState.map(turn => turn.type === turnId ? { ...turn, start_date: formattedDate } : turn);
      return updatedTime;
    });
  };

  const handleEndDateChange = (turnId, value) => {
    const formattedDate = value ? value.toISOString() : null;
    setTime(prevState => {
      const updatedTime = prevState.map((turn, index) => {
        if (turn.type === turnId) {
          return { ...turn, end_date: formattedDate };
        } else if (turn.type === turnId + 1 && index > 0) {
          // Only update the start_date of the next turn if it exists (index > 0).
          return { ...turn, start_date: formattedDate };
        } else {
          return turn;
        }
      });
      return updatedTime;
    });
  };

  useEffect(() => {
    const filteredTurnos = time.filter(turn => turn.start_date !== null && turn.end_date !== null);
    const isChanged = JSON.stringify(filteredTurnos) !== JSON.stringify(setTurnos);
    if (isChanged) {
      setTurnos(filteredTurnos);
    }
  }, [time, setTurnos]);

  return (
    <div style={{ margin: "1.5rem 0" }}>
      <>
        {time.map(turn => (
          <div key={turn.type}>
            <h4 className={styled.title}> Turno {turn.type}</h4>
            <div className={styled.container_turno}>
              <div className={styled.item}>
                <p>Inicio</p>
                <Calendar value={turn.start_date ? new Date(turn.start_date) : null} onChange={(e) => handleStartDateChange(turn.type, e.value)} timeOnly hourFormat="12" />
              </div>
              <div className={styled.item}>
                <p>Fin</p>
                <Calendar value={turn.end_date ? new Date(turn.end_date) : null} onChange={(e) => handleEndDateChange(turn.type, e.value)} timeOnly hourFormat="12" />
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
}

export default Turnos;
