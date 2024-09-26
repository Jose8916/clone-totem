import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es"; // Importa la localización para España (o tu país)
import styled from "./BoxHorario.module.css";
import { Button } from "primereact/button";
import useModal from "@/hooks/useModal";
import SelectHorario from "./SelectHorario";
import Turnos from "./Turnos";
import InputPrecio from "./InputPrecio/InputPrecio";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function BoxHorario({ malla, getHoraString }) {
  const { Modal, hideModal, showModal } = useModal();
  const [horarioEdit, setHorarioEdit] = useState(4);
  const [vista, setVista] = useState(1);
  const [turnoActual, setTurnoActual] = useState(null);

  // useEffect(() => {
  //   // Obtenemos la hora actual con Moment.js
  //   const horaActual = moment();

  //   // Definimos los rangos de tiempo para cada turno
  //   const turnos = [
  //     { nombre: 'Turno 1', inicio: moment('06:00', 'HH:mm'), fin: moment('12:00', 'HH:mm') },
  //     { nombre: 'Turno 2', inicio: moment('12:00', 'HH:mm'), fin: moment('15:00', 'HH:mm').add(1, 'day') },
  //     { nombre: 'Turno 3', inicio: moment('18:00', 'HH:mm'), fin: moment('00:00', 'HH:mm').add(1, 'day') }
  //   ];

  //   // Comprobamos si la hora actual está dentro de algún turno
  //   // const turnoActual = turnos.find(turno => horaActual.isBetween(turno.inicio, turno.fin));

  //   // Actualizamos el estado con el turno actual
  //   setTurnoActual(turnoActual);
  // }, []);

  // Función para determinar si un turno coincide con la hora actual
  const isTurnoActual = (turno) => {
    return turnoActual && turnoActual.nombre === turno;
  };

  const onChangeView = () => {
    if (vista === 1) {
      return setVista(2);
    }

    if (vista === 2) {
      return setVista(1);
    }
  };

  const turno1_start = getHoraString(malla?.items[0].start_date);
  const turno1_end = getHoraString(malla?.items[0].end_date);

  const turno2_start = getHoraString(malla?.items[1]?.start_date);
  const turno2_end = getHoraString(malla?.items[1]?.end_date);

  return (
    <div className={styled.container_box}>
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "1rem", backgroundColor: "red", height: "200px" }}>
        {malla?.items?.length === 1 && (
          <span>
            Turno 1: {turno1_start} - {turno1_end}
          </span>
        )}

        {malla?.items?.length === 2 && (
          <span>
            Turno 1: {turno1_start} - {turno1_end}
            Turno 2: {turno2_start} - {turno2_end}
          </span>
        )}
      </div>
    </div>
  );
}

export default BoxHorario;
