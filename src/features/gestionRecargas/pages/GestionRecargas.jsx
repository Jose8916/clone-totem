import React, { useState, useEffect } from "react";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { DataTable } from "@/components/DataTable/DataTable";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { downloadFile } from "@/helpers/downloadFile";
import { useSelector } from "react-redux";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";
import style from "./GestionRecargas.module.css";
import useModal from "@/hooks/useModal";
import { getHora, getTime, getTimeToFetch } from "@/helpers/getTime";
import axios from "axios";
import { url } from "@/connections/mainApi";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { NiubizModal } from "../NiubizModal/NiubizModal";

export const GestionRecargas = () => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const { showModal } = useModal();
	const niubizModal = useModal();
	const [selectedDates, setSelectedDates] = useState({
		dateInit: null,
		dateFin: null,
	});
	const [selectedFuel, setFuel] = useState('');
	const [selectedTransactionStatus, setTransactionStatus] = useState('');
	const [fuelData, setFuelData] = useState([]);
	const fuelOrder = ['PREMIUM', 'REGULAR', 'DIESEL', 'GLP', 'GNV'];
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const transactionStatatusData = [
		{ name: "PENDIENTE", code: "PENDIENTE" },
		{ name: "INTERRUMPIDA", code: "INTERRUMPIDA" },
		{ name: "FINALIZADA", code: "FINALIZADA" },
	];
	const [niubizData, setNiubizData] = useState({});

	useEffect(() => {
		fetchFuelData();
		let currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		setSelectedDates({
			dateInit: currentDate,
			dateFin: currentDate,
		});
	}, []);
	
	useEffect(() => {
		if (selectedDates.dateInit && selectedDates.dateFin) {
			handleClick();
		}
	}, [selectedDates.dateInit, selectedDates.dateFin,selectedFuel, selectedTransactionStatus]);

	const fetchDistrictData = async () => {
		try {
			const response = await axios.get(`${url}/price-list-competition-direct`, {
				headers: { Authorization: `Bearer ${loginData}` }
			});
			const districtNames = response.data.map(item => ({ districtName: item.distrito }));
			setDistrictData(districtNames);
		} catch (error) {
			console.error("Error al cargar los datos:", error);
			throw new Error("Error al cargar los datos.");
		}
	};

	const fetchEstablecimientoData = async () => {
		try {
			const response = await axios.get(`${url}/price-list-competition-direct`, {
				headers: { Authorization: `Bearer ${loginData}` }
			});
			const establecimientoNames = response.data.map(item => ({ establecimientoName: item.establecimiento }));
			setEstablecimientoData(establecimientoNames);
		} catch (error) {
			console.error("Error al cargar los datos:", error);
			throw new Error("Error al cargar los datos.");
		}
	};

	const fetchFuelData = async () => {
		try {
			const response = await axios.get(`${url}/fuels`, { headers: { Authorization: `Bearer ${loginData}` } });
			const orderedData = response.data.sort((a, b) => {
                return fuelOrder.indexOf(a.fuelName) - fuelOrder.indexOf(b.fuelName);
            });
			setFuelData(orderedData);
		} catch (error) {
			throw new Error("Error al cargar los datos.");
		}
	};

	const handleDateChange = (name, value) => {
		setErrorMessage(""); 
		if (name === "dateInit" && selectedDates.dateFin && value > selectedDates.dateFin) {
			setErrorMessage("La fecha de inicio no puede ser posterior a la fecha de fin.");
			return;
		} else if (name === "dateFin" && selectedDates.dateInit && value < selectedDates.dateInit) {
			setErrorMessage("La fecha de fin no puede ser anterior a la fecha de inicio.");
			return;
		}
		setSelectedDates((prevDates) => ({
			...prevDates,
			[name]: value,
		}));
	};

	const setSelectedFuelId = async (selectedOption) => {
		setFuel(selectedOption);
	};
	const setSelectedTransactionStatus = async (selectedOption) => {
		if (selectedOption && typeof selectedOption === 'object') {
			setTransactionStatus(selectedOption.code);
		} else { setTransactionStatus(selectedOption); }
	};

	const setSelectedDistrict = async (selectedOption) => {
		setDistrict(selectedOption);
	};

	const setSelectedEstablecimiento = async (selectedOption) => {
		setEstablecimiento(selectedOption);
	};

	const handleClearFilters = () => {
		let currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		setSelectedDates({
			dateInit: currentDate,
			dateFin: currentDate,
		});
		setFuel('');
        setTransactionStatus('');
    };

	const handleClick = async () => {
		setIsLoading(true);
		try {
			const startDate = getTimeToFetch(selectedDates.dateInit);
			const endDate = getTimeToFetch(selectedDates.dateFin);
			let config = {
				params: {
					startDate: startDate,
					endDate: endDate,
				},
				headers: { Authorization: `Bearer ${loginData}` }
			};
			if(selectedFuel && selectedFuel.id !== ''){ config.params.fuelId = selectedFuel.id;  }
			if(selectedTransactionStatus && selectedTransactionStatus !== ''){ config.params.transactionStatus = selectedTransactionStatus;  }
			const response = await axios.get(`${url}/transaccion`, config);

			if (response?.data.transaction.length === 0) {
				setData([]);
			} else {
				setData(response.data);
			}
		} catch (error) {
			console.error("Error al obtener los datos:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownloadExcel = async () => {
		try {
			const dateInit = getTimeToFetch(selectedDates.dateInit) || "";
			const dateFin = getTimeToFetch(selectedDates.dateFin) || "";
			const config = {
				params: {
					startDate: dateInit,
					endDate: dateFin,
				},
				headers: { Authorization: `Bearer ${loginData}` },
				responseType: "blob",
			};
			if(selectedFuel && selectedFuel.id !== ''){ config.params.fuelId = selectedFuel.id;  }
			if(selectedTransactionStatus && selectedTransactionStatus !== ''){ config.params.transactionStatus = selectedTransactionStatus;  }
			const resp = await axios.get(`${url}/transaccion/excel`, config);
			if (resp?.data) {
				downloadFile(resp.data, "historial-transaccion.xlsx");
			} else {
				//Message empty data
			}	
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};

	const onOpenNibuizModal = (rowData) => {
		setNiubizData(rowData?.niubizData);
		niubizModal.onVisibleModal();
	};

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Historial de transacciones</h2>
				<hr />
				<SectionStructure className={style.filtersContainer}>
					<div className={style.calendar_container}>
						<PrimeCalendar
							value={selectedDates.dateInit}
							onChange={(e) => handleDateChange("dateInit", e.value)}
							textLabel="Fecha inicio"
						/>
					</div>
					<div className={style.calendar_container}>
						<PrimeCalendar
							value={selectedDates.dateFin}
							onChange={(e) => handleDateChange("dateFin", e.value)}
							textLabel="Fecha final"
						/>
					</div>
					<div className={style.selectContainer}>
						<label className={style.labelStyle} htmlFor="fuelId">Combustible:</label>
						<Dropdown
							className={style.selectItem}
							id="fuelId2"
							onChange={(e) => setSelectedFuelId(e.target.value)}
							options={fuelData}
							optionLabel="fuelName"
							placeholder={ selectedFuel.fuelName ? selectedFuel?.fuelName : "Combustible" }
						/>
					</div>
					<div className={style.selectContainer}>
						<label className={style.labelStyle} htmlFor="transactionStatus">Estado:</label>
						<Dropdown
							className={style.selectItem}
							id="transactionStatus"
							onChange={(e) => setSelectedTransactionStatus(e.target.value)}
							options={transactionStatatusData}
							optionLabel="name"
							placeholder={ selectedTransactionStatus !== "" ? selectedTransactionStatus : "Estado" }
						/>
					</div>
					<div className={style.selectContainer}>
						<label className={style.labelStyle} htmlFor="district">Distrito:</label>
						<Dropdown
							className={style.selectItem}
							id="district"
							onChange={(e) => setSelectedDistrict(e.target.value)}
							options={districtData}
							optionLabel="districtName"
							placeholder={ district !== "" ? district : "Distrito" }
						/>
					</div>
					<div className={style.selectContainer}>
						<label className={style.labelStyle} htmlFor="establecimiento">Establecimiento:</label>
						<Dropdown
							className={style.selectItem}
							id="establecimiento"
							onChange={(e) => setSelectedEstablecimiento(e.target.value)}
							options={establecimientoData}
							optionLabel="establecimientoName"
							placeholder={ establecimiento !== "" ? establecimiento : "Establecimiento" }
						/>
					</div>
					<div className={style.selectContainer}>
						<label className={style.labelStyle}>{'\u00A0'}</label>
						<Button
							icon="pi pi-times"
							onClick={handleClearFilters}
							className="p-button-danger"
							label=""
						/>
					</div>
					{errorMessage && <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>}{" "}
				</SectionStructure>

				<DataTable
					columns={columns}
					key={data.id}
					data={data.transaction}
					onAddModal={showModal}
					isExport={true}
					onExport={handleDownloadExcel}
					onNiubiz={onOpenNibuizModal}
				/>

				<div style={{ width: "fit-content" }}>
					<SectionStructure className={style.totalsContainer}>
						<div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
							<p style={{ fontWeight: "700" }}>Total ventas {"(GAL)"}:</p>
							<p className={style.inputStyle}>{ (data.total_gal) ? data.total_gal : 0 }</p>
						</div>
						<div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
							<p style={{ fontWeight: "700" }}>Total ventas {"(PEN)"}:</p>
							<p className={style.inputStyle}>S/. { (data.total_pen) ? data.total_pen : 0 }</p>
						</div>
					</SectionStructure>
				</div>
			</MainContentStructure>

			<PrimeModal
				header="Información de pago Niubiz"
				modalStatus={niubizModal.modalStatus}
				onHideModal={niubizModal.onHideModal}
				width={400}
			>
				<NiubizModal niubizData={niubizData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "Cód. Compra", campo: "purchaseCode" },
	{ nombre: "Placa", campo: "placa" },
	{
		nombre: "Fecha",
		body: (rowData) => {
			let fechaCompra = getTime(rowData);
			return <>{fechaCompra}</>;
		},
	},
	{
		nombre: "Hora",
		body: (rowData) => {
			let horaCompra = getHora(rowData);
			return <>{horaCompra}</>;
		},
	},
	{
		nombre: "Combustible",
		body: (rowData) => {
			return <>{rowData?.fuel?.fuelName}</>;
		},
	},
	{ nombre: "#Galones", campo: "gallons" },
	{ nombre: "Precio /gal", campo: "amountPrice" },
	{ nombre: "Total PEN", campo: "amountPriceTotal" },
	{ nombre: "Descuento", campo: "totalDiscount" },
	{ nombre: "Estado", campo: "transactionStatus" },
];
