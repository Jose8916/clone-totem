import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { InputLabel } from "@mui/material";
import style from "./PrimeSelection.module.css";
import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";


export const PrimeSelection = ({
  labels,
  idKey,
  textLabel,
  value,
  onValueChange,
  showEditButton,
  additionalElement,
  onClickIcon,
  services,
  setServices,
  iconComponent, // Nueva prop para el componente de icono
}) => {
  const [checked, setChecked] = useState(value === labels[0]);
 

  const handleToggleChange = () => {
    // Encuentra el índice del objeto a editar
    const editIndex = services.findIndex(service => service.id === idKey);
  
    // Si no se encuentra el objeto, no hacemos nada
    if (editIndex === -1) return;
  
    // Crea una copia del array services usando el spread operator
    const updatedServices = [...services];
  
    // Modifica el objeto edit en la copia del array, alternando el valor de status
    updatedServices[editIndex] = {
      ...updatedServices[editIndex],
      status: !updatedServices[editIndex].status, // Alternamos el valor de status
    };
  
    // Actualiza el estado con el nuevo array que contiene el objeto edit modificado
    setServices(updatedServices);
  
    // Resto del código...
    const selectedValue = checked ? labels[1] : labels[0];
    setChecked(!checked);
    onValueChange(selectedValue);
  };


  return (
    <>
      <SectionStructure>
        <div className={style.Selection_toggle}>
          <InputLabel className={style.Label_text}> { textLabel } </InputLabel>
          <ToggleButton
            onLabel={labels[0]}
            offLabel={labels[1]}
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            checked={checked}
            onChange={handleToggleChange}
            className={style.toggle}
          />
          {showEditButton && (
            <>
              {additionalElement}
             
            </>
          )}
        </div>
      </SectionStructure>
    </>
  );
};
