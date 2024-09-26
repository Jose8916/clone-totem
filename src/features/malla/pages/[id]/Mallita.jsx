import BoxHorario from "@/components/BoxHorario/BoxHorario";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import TableEdit from "@/components/TableEdit/TableEdit";
import style from "@/features/malla/pages/Malla.module.css";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";
import PrimeDropDown from "@/primeComponents/PrimeDropDown/PrimeDropDown";
import PrimeSelect from "@/primeComponents/PrimeSelect/PrimeSelect";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import MallaturnTable from "./components/MallaturnTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import moment from "moment";

const columns = [
  { field: "Rango de Consumo", header: "Rango de Consumo" },
  { field: "Rango de Consumo 2", header: "Rango de Consumo 2" },
  { field: "Rango de Consumo 3", header: "Rango de Consumo 3" },
];

const columns2 = [
  { field: "Precio Especial", header: "Precio Especial" },
  { field: "Precio Especial 2", header: "Precio Especial 2" },
  { field: "Precio Especial 3", header: "Precio Especial 3" },
];

function Mallita() {
  const loginData = useSelector((state) => state.auth?.login?.token);
  const stationServiceIds = useSelector((state) => state.dataServices) || [];
  const [malla, setMalla] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (stationServiceIds.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://e-totem-back-production.up.railway.app/api/turns/by-station/${stationServiceIds[0]._id}`, {
            headers: {
              "x-token": loginData,
            },
          });

          const mallaMatch = response.data.find((mallita) => mallita._id === id);

          setMalla(mallaMatch);
        } catch (error) {
          throw new Error("Error en la petición GET en Malla");
        }
      };
      fetchData();
    }
  }, [stationServiceIds]);

  const mostrarTipo = malla?.type_fuel === 1 ? "Regular" : "Premium";

  function getFechaString(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const start_date = malla?.start_date;
  const end_date = malla?.end_date;

  const fechaInicio = getFechaString(start_date);
  const fechaFin = getFechaString(end_date);

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const turnos = malla?.items?.map((item, index) => {
    const startTime = formatTime(item?.start_date);
    const endTime = formatTime(item?.end_date);
    return `Turno ${index + 1}: ${startTime} - ${endTime}`;
  });

  const turnosText = turnos?.join("\n");

  return (
    <>
      <MainContentStructure>
        <SectionStructure>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div className={style.seccion_1_container}>
              <TextBoxField name={"fechainicio"} textLabel={"Fecha inicio"} value={fechaInicio} disabled={true} />

              <TextBoxField name={"fechafin"} textLabel={"Fecha fin"} value={fechaFin} disabled={true} />

              <TextBoxField name={"combustible"} textLabel={"Tipo Combustible"} value={mostrarTipo} disabled={true} />
            </div>
       
          </div>
        </SectionStructure>

        <SectionStructure>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MallaturnTable malla={malla} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>{/* <Button label="Editar Precios"/> */}
          <p> * Todos los precios incluyen IGV </p>
          </div>
        </SectionStructure>
      </MainContentStructure>
    </>
  );
}

export default Mallita;
