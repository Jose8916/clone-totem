import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading/Loading";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { DataTable } from "@/components/DataTable/DataTable";
import { Button } from "primereact/button";
import style from "./GestionGrifos.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useState } from "react";
import { getHora, getTime } from "@/helpers/getTime";
const GestionGrifos = () => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [showDetails, setShowDetails] = useState(false);
	const [dataStation, setDataStation] = useState([]);
	const [selectedStationId, setSelectedStationId] = useState(null);

	const tipoGasolina = (rowData) => {
		return rowData.type_fuel === 1 ? "Regular" : "Premium";
	};

	const columns = [
		{ nombre: "Estación", campo: "name" },
		{ nombre: "Area", campo: "area" },
		{ nombre: "Direccion", campo: "address" },
		{ nombre: "id_grifo", campo: "_id" },
	];

	const columns2 = [
		{ nombre: "ID", campo: "userId" },
		{ nombre: "Fecha", campo: getTime },
		{ nombre: "Hora", campo: getHora },
		{ nombre: "Numero", campo: "number" },
		{ nombre: "N° Gal", campo: "gallons" },
		{ nombre: "N° Soles", campo: "price" },
		{ nombre: "Rango", campo: tipoGasolina },
		{ nombre: "Estado", campo: "status" },
	];

	const buttonSuccess = (rowData) => {
		return (
			<Button
				className="p-button-info p-button-rounded"
				style={{ width: "40px", height: "40px" }}
				type="button"
				icon="pi pi-eye"
				onClick={() => handleDetailsClick(rowData._id)}
			/>
		);
	};

	const handleDetailsClick = async (id) => {
		try {
			const response = await axios.get(
				`https://e-totem-back-production.up.railway.app/api/admin/stations/${id}/orders`,
				{
					headers: {
						"x-token": loginData,
					},
				}
			);

			setSelectedStationId(id);
			setDataStation(response.data);
			setShowDetails(true);
		} catch (error) {
			console.error("Error al obtener detalles:", error);
		}
	};

	const fetchSegmentacionClientes = async () => {
		try {
			const response = await axios.get(
				"https://e-totem-back-production.up.railway.app/api/admin/stations",
				{
					headers: {
						"x-token": loginData,
					},
				}
			);
			return response.data;
		} catch (error) {
			throw new Error("Error al obtener la segmentación de clientes");
		}
	};

	const { data, isLoading, error } = useQuery("segmentacionClientes", fetchSegmentacionClientes);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const selectedStation = data.find((station) => station._id === selectedStationId);

	return (
		<>
			<MainContentStructure>
				<div className={style.back__btn}>
					{!!showDetails && (
						<>
							<div style={{ cursor: "pointer" }} onClick={() => setShowDetails(false)}>
								<IoMdArrowRoundBack />
							</div>
						</>
					)}
					<h2 className="title__sections"> Gestionar Grifos</h2>
				</div>
				<hr />
				{data && !showDetails ? (
					<DataTable
						columns={columns}
						data={data}
						buttonExcel={false}
						showEditButton={true}
						buttonSuccess={buttonSuccess}
					/>
				) : (
					<div>
						{selectedStation && (
							<>
								<div className={style.gestion__details}>
									<h3>Detalles del Grifo: {selectedStation.name}</h3>
									<p>{selectedStation.address}</p>
								</div>
								<DataTable columns={columns2} data={dataStation} buttonExcel={false} />
							</>
						)}
					</div>
				)}
			</MainContentStructure>
		</>
	);
};

export default GestionGrifos;
