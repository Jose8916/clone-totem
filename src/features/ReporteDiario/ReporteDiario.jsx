import { useState, useEffect } from "react";
import style from "./ReporteDiario.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { IntencionesCompra } from "./components/IntencionesCompra/IntencionesCompra";
import { Ventas } from "./components/Ventas/Ventas";
import { url } from "@/connections/mainApi";
import axios from "axios";
import { useSelector } from "react-redux";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { getTimeToFetch } from "@/helpers/getTime";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { downloadFile } from "@/helpers/downloadFile";

function ReporteDiario() {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [reporteData, setReporteData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [selectedDates, setSelectedDates] = useState({
		fechaInicio: "",
		fechaFin: "",
	});

	useEffect(() => {
		let currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		setSelectedDates({
			fechaInicio: currentDate,
			fechaFin: currentDate,
		});
	}, []);

	useEffect(() => {
		if (selectedDates.fechaInicio && selectedDates.fechaFin) {
			handleClick();
		}
	}, [selectedDates.fechaInicio, selectedDates.fechaFin]);

	const handleDateChange = (name, value) => {
		setErrorMessage("");
		if (name === "fechaInicio" && selectedDates.fechaFin && value > selectedDates.fechaFin) {
			setErrorMessage("La fecha de inicio no puede ser posterior a la fecha de fin.");
			return;
		} else if (name === "fechaFin" && selectedDates.fechaInicio && value < selectedDates.fechaInicio) {
			setErrorMessage("La fecha de fin no puede ser anterior a la fecha de inicio.");
			return;
		}
		setSelectedDates((prevDates) => ({
			...prevDates,
			[name]: value,
		}));
	};

	const handleClick = async () => {
		setIsLoading(true);
		try {
			const fechaInicio = getTimeToFetch(selectedDates.fechaInicio);
			const fechaFin = getTimeToFetch(selectedDates.fechaFin);
			const response = await axios.post(`${url}/transaccion/back-office/reporte-diario`, 
				{ fechaInicio: fechaInicio, fechaFin: fechaFin }, 
				{ headers: { Authorization: `Bearer ${loginData}` } });
			setReporteData(response.data);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownloadExcel = async () => {
		try {
			const fechaInicio = getTimeToFetch(selectedDates.fechaInicio) || "";
			const fechaFin = getTimeToFetch(selectedDates.fechaFin) || "";

			const resp = await axios.post(
				`${url}/transaccion/back-office/reporte-diario/excel`,
				{ fechaInicio, fechaFin },
				{
					responseType: "blob",
					headers: { Authorization: `Bearer ${loginData}` }
				}
			);

			downloadFile(resp.data, "reporte-diario.xlsx");
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Reporte Diario</h2>
				<hr />
				<SectionStructure>
					<div className={style.calendar_container}>
						<PrimeCalendar
							width="45%"
							value={selectedDates.fechaInicio}
							onChange={(e) => handleDateChange("fechaInicio", e.value)}
							textLabel="Fecha inicio"
						/>

						<PrimeCalendar
							width="45%"
							value={selectedDates.fechaFin}
							onChange={(e) => handleDateChange("fechaFin", e.value)}
							textLabel="Fecha final"
						/>
					</div>
					{errorMessage && <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>}{" "}
				</SectionStructure>

				<IntencionesCompra data={reporteData.intencionesCompra} />

				<Ventas data={reporteData.ventas} />

				<div style={{ width: "200px" }}>
					<CustomButton
						onClick={handleDownloadExcel}
						text="Exportar a Excel"
						backgroundButton="var(--button-color)"
						colorP="#fff"
					/>
				</div>
			</MainContentStructure>
		</>
	);
}

export default ReporteDiario;
