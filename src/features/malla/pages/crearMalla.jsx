import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";
import { useState } from "react";
import PrimeDropDown from "@/primeComponents/PrimeDropDown/PrimeDropDown";
import { Button } from 'primereact/button';
import style from "./crearMalla.module.css";
import Turnos from "@/components/BoxHorario/Turnos";
import InputPrecio from "@/components/BoxHorario/InputPrecio/InputPrecio";
import { useSelector } from "react-redux";
import axios from "axios";

function CrearMalla ({ fetchData, hideModal } ) {
  const [selectedDates, setSelectedDates] = useState( { dateInit: null, dateFin: null } );
  const [vistas, setVistas] = useState( 1 );
  const [turnos, setTurnos] = useState( null );
  const [tipoGasolina, setTipoGasolina] = useState( null );
  const idStation = useSelector((state) => state.dataServices[0]._id) || [];
  const loginData = useSelector((state) => state.auth?.login?.token);


  const handleDateChange = (name, value) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  const handleVista = () => {
    setVistas( vistas + 1)
  }

  const handleLastVista = () => {
    setVistas( vistas - 1)
  }

  const handleSubmit = async() => {

    const body = {
      start_date: selectedDates.dateInit,
      end_date: selectedDates.dateFin,
      items: turnos,
      type_fuel: Number(tipoGasolina),
      stationServiceId: idStation
    }

    try {
      const response = await axios.post(
        "https://e-totem-back-production.up.railway.app/api/turns",
        body,
        {
          headers: {
            'x-token': loginData,
          }
        }
      )
      fetchData()
    } catch (error) {
   
      throw new Error("Error al rellenar la Malla");
    }

  }

  return (
    <>
      {
        vistas === 1 && 

        <SectionStructure>
          <h3 style={ {textAlign: "center"} }> Selecciona la fecha y tipo de Combustible</h3>

          <div style={ {display: "flex", justifyContent: "center", alignItems: "start", width: "100%" } }>
            <div className={style.seccion_1_container}>
              <PrimeCalendar
                value={selectedDates.dateInit}
                onChange={(e) => handleDateChange("dateInit", e.value)}
                textLabel="Fecha inicio"
                />

              <PrimeCalendar
                value={selectedDates.dateFin}
                onChange={(e) => handleDateChange("dateFin", e.value)}
                textLabel="Fecha final"
                />

              <PrimeDropDown setTipoGasolina={setTipoGasolina}/>
            </div>
          </div>
        </SectionStructure>
      }

      {
        vistas === 2 && 

        <div className={style.section_2}>
          <h3 style={ {textAlign: "center"} }> Selecciona el número de turnos</h3>
          <Turnos setTurnos={setTurnos} turnos={turnos}/>

        </div>
      }

      {
        vistas === 3 && 

        <div>
          <h3 style={ {textAlign: "center"} }> Define tus precios en función a tus turnos </h3>

          { 
            turnos.length > 0 && 
            turnos.map( (turno, index ) => (
              <InputPrecio key={index} turno={turno} malla={turnos} setMalla={setTurnos} />
            ))      
          }

          <p> * Todos los precios incluyen IGV </p>
        </div>
      }

      
        <div style={ {display: "flex", justifyContent: "center", gap: "10px"} }>
        {
          (vistas === 1 || vistas === 2) &&
          <>
            <Button icon="pi pi-arrow-left" onClick={handleLastVista} />
            <Button icon="pi pi-arrow-right"  onClick={handleVista} />
          </>
        }

        {
          vistas === 3 && 

          <Button label="Guardar" onClick={() => {
            handleSubmit()
            hideModal()
          }}/>
        }

        </div>
      

    </>
  );
}

export default CrearMalla;