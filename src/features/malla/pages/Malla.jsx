import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataTable } from "@/components/DataTable/DataTable";
import useModal from "@/hooks/useModal";
import CrearMalla from "./crearMalla";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setMallaServices } from "@/store/slices/mallaData/MallaSlice";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

function Malla() {
  const [vista, setVista] = useState(1);
  const { Modal, hideModal, showModal } = useModal();
  const loginData = useSelector((state) => state.auth?.login?.token);
  const stationServiceIds = useSelector((state) => state.dataServices) || [];
  const [listMalla, setListMalla] = useState( null );

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleVista = () => {

    if(vista === 1) {
      setVista(2)
    }

    if(vista === 2) {
      setVista(1)
    }
  }

  const buttonSuccess = (rowData) => {
    return (
      <Button
        className="p-button-info p-button-rounded"
        style={{ width: "40px", height: "40px" }}
        type="button"
        icon="pi pi-eye"
        onClick={() => navigate(`/admin/configuracion-malla/${rowData._id}`)}
      />
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://e-totem-back-production.up.railway.app/api/turns/by-station/${stationServiceIds[0]._id}`,
        {
          headers: {
            'x-token': loginData,
          }
        }
        );
        setListMalla(response.data)
        dispatch( setMallaServices(listMalla) )
          
    } catch (error) {
    
      throw new Error("Error en la petición GET en Malla");
    }
  };
    
  const buttonDecline = (rowData) => {
    const handleDelete = () => {
      const url = `https://e-totem-back-production.up.railway.app/api/turns/${rowData._id}`;
  
      axios.delete(url, {
        headers :{ 'x-token' : loginData },
      })
        .then(response => {
          
          fetchData()
        })
        .catch(error => {
          console.error('Error al realizar la eliminación:', error);
        });
    };

    const confirm2 = () => {
      confirmDialog({
        message: 'Desea eliminar esta malla?',
        header: 'Confirmar para eliminar',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        acceptClassName: 'p-button-danger',
        accept: handleDelete,
        reject: () => {},
        contentStyle: {
          width: '350px', 
          height: '70px' 
        }
      });
    };
  
    return (
      <Button
        className="p-button-danger p-button-rounded"
        style={{ width: "40px", height: "40px" }}
        type="button"
        icon="pi pi-trash"
        onClick={confirm2}
      />
    );
  };
  useEffect(() => {

    if(stationServiceIds.length > 0){
        fetchData();
      }
  }, [stationServiceIds]);

  const getFecha = (rowData) => {
    const fecha = new Date(rowData.created_at);
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };
  
  const getHora = (rowData) => {
    const fecha = new Date(rowData.created_at);
    const hour = fecha.getHours();
    const minute = fecha.getMinutes();
    const second = fecha.getSeconds();
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  };

  const getProductValue = (rowData) => {
    return rowData.type_fuel === 1 ? "Regular" : "Premium";
  };

  const columns3 = [
    { nombre: "Id", campo: "_id" },
    { nombre: "Fecha de Creación", campo: getFecha },
    { nombre: "Hora de Creación", campo: getHora },
    { nombre: "Combustible", campo: getProductValue }
  ];

  return (
    <>
      <MainContentStructure>

      <Modal width={"800px"} height={"auto"} title={"Crear Malla"}>
        <CrearMalla fetchData={fetchData} hideModal={hideModal}/>
      </Modal>

        <div style={ {display: "flex", gap:"10px", alignItems: "center"} }>
       { 
       vista === 2 &&
       <Button 
          className="p-button p-button-rounded"
          style={{ width: "40px", height: "40px" }}
          type="button"
          icon="pi pi-arrow-left"
          onClick={handleVista}/>
          }
        <h2 className="title__sections">Fijación de precios</h2>
        </div>
      <hr />
     
      <>
        <DataTable columns={columns3} data={listMalla} showEditButton={true} buttonSuccess={buttonSuccess} buttonExcel={false} paginator={false} createButton={true} createOnClick={showModal} showDeleteButton={true} buttonDecline={buttonDecline} />

      </>
    

      </MainContentStructure>
      <ConfirmDialog/>
    </>
    );
}

export default Malla;
