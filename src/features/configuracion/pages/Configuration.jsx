import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import ServicioItem from "@/components/ServicioItem/ServicioItem";
import InitialServicesValue from "../InitialServices.json";
import { setdataServices } from "@/store/slices/servicesData/ServicesSlice";
import { useDispatch } from "react-redux";
import Loading from "@/components/Loading/Loading";
import { Dropdown } from "primereact/dropdown";
import { InputLabel } from "@mui/material";
import style from "./Configuration.module.css";
import { url } from "@/connections/mainApi";
import { setToast } from "@/store/slices/toast/toastSlice";

const initialRegister = {
	faucetStationName: "",
	faucetStationdireccion: "",
	faucetStationArea: 0,
	services: InitialServicesValue,
	faucetStationProvincia: "",
	faucetStationDistrito: "",
	faucetStationurlMap: "",
	faucetStationurlWaze: ""
};

const district = [
	{ name: "Lima", code: "LIMA" },
	{ name: "Chorrillos", code: "CHORRILLOS" },
	{ name: "San Isidro", code: "SAN ISIDRO" },
	{ name: "Ruta Chaclayo", code: "RUTA CHACLAYO" },
	{ name: "Ruta Chosica", code: "RUTA CHOSICA" },
	{ name: "Ruta San Isidro", code: "RUTA SAN ISIDRO" },
	{ name: "San Juan de Lurigancho", code: "SAN JUAN DE LURIGANCHO" },
];

const Configuration = () => {
	const labels = ["Activo", "Inactivo"];
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [registerData, setRegisterData] = useState(initialRegister);
	const [data, setData] = useState([]);
	const [services, setServices] = useState(null);
	const [isLoading, setisLoading] = useState(false);
	const dispatch = useDispatch();

	const fetchData = async () => {
		setisLoading(true);
		try {
			const response = await axios.get(`${url}/faucet-station/unico`, { headers: { Authorization: `Bearer ${loginData}` } });
			setData(response.data);
			setServices(response.data.servicios);
			setisLoading(false);
		} catch (error) {
			setisLoading(false);
			throw new Error("Error en la petición GET en Configuracion");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (data === undefined) {
			setRegisterData(initialRegister);
		} else {
			setRegisterData(data);
		}
	}, [data]);

	const handleChange = (e) => {
		const target = e.target;
		setRegisterData({
			...registerData,
			[target.name]: target.value,
		});
	};

	const handleDistrictChange = (e) => {
		setRegisterData({
			...registerData,
			faucetStationDistrito: e.value,
		});
	};

	const handleSubmit = async () => {
		if (data === undefined) {
			const {
				faucetStationArea,
				faucetStationName,
				faucetStationdireccion,
				services,
				faucetStationProvincia,
				faucetStationDistrito,
				faucetStationurlMap,
				faucetStationurlWaze
			} = registerData;
			const areaForm = Number(faucetStationArea);
			const body = {
				faucetStationArea: areaForm,
				faucetStationName,
				faucetStationdireccion,
				services,
				faucetStationProvincia,
				faucetStationDistrito: faucetStationDistrito.code,
				faucetStationurlMap,
				faucetStationurlWaze
			};
			try {
				const response = await axios.post(`${url}faucet-station/unico`, body, { headers: { Authorization: `Bearer ${loginData}` } });
				dispatch(setdataServices(response.data));
				dispatch(
					setToast({
						severity: "success",
						summary: `Configuración Actualizado`,
						detail: `Configuración ha sido actualizado exitosamente`,
					})
				);
				fetchData();
			} catch (error) {
				throw new Error("Error al obtener los servicios");
			}
		} else {
			const {
				faucetStationArea,
				faucetStationName,
				faucetStationdireccion,
				faucetStationProvincia,
				faucetStationurlMap,
				faucetStationurlWaze
			} = registerData;
			const areaForm = Number(faucetStationArea);
			const districtCode = registerData.faucetStationDistrito.code ? registerData.faucetStationDistrito.code : data.faucetStationDistrito;
			const body = {
				faucetStationArea: areaForm,
				faucetStationName,
				faucetStationdireccion,
				servicios: services,
				faucetStationProvincia,
				faucetStationDistrito: districtCode,
				faucetStationurlMap,
				faucetStationurlWaze
			};
			try {
				dispatch(
					setToast({
						severity: "success",
						summary: `Configuración Actualizado`,
						detail: `Configuración ha sido actualizado exitosamente`,
					})
				);
				const response = await axios.patch(`${url}/faucet-station/unico/${data?.id}`, body, { headers: { Authorization: `Bearer ${loginData}` } });
			} catch (error) {
				throw new Error("Error al obtener los servicios");
			}
		}
	};

	return (
		<>
			{!!isLoading ? (
				<Loading />
			) : (
				<MainContentStructure>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<h2 className="title__sections">
							{data !== undefined ? "Configura tu estación" : "Registra tu estación"}{" "}
						</h2>
					</div>
					<hr />
					<div className={style.inputs_config}>
						<SectionStructure>
							<TextBoxField
								textLabel={"Nombre de la Estación"}
								name={"faucetStationName"}
								value={registerData.faucetStationName ? registerData.faucetStationName : ''}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<TextBoxField
								textLabel={"Dirección de la Estación"}
								name={"faucetStationdireccion"}
								value={registerData.faucetStationdireccion ? registerData.faucetStationdireccion : ''}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<TextBoxField
								textLabel={"Google URL Map"}
								name={"faucetStationurlMap"}
								value={registerData.faucetStationurlMap ? registerData.faucetStationurlMap : ''}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<TextBoxField
								textLabel={"Waze URL Map"}
								name={"faucetStationurlWaze"}
								value={registerData.faucetStationurlWaze ? registerData.faucetStationurlWaze : ''}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<div className={style.container__input}>
								<TextBoxField
									textLabel={"Área del Grifo"}
									name={"faucetStationArea"}
									value={registerData.faucetStationArea ? registerData.faucetStationArea : ''}
									onChange={handleChange}
								/>
								<p> m2 </p>
							</div>
						</SectionStructure>

						<SectionStructure>
							<TextBoxField
								textLabel={"Provincia"}
								name={"faucetStationProvincia"}
								value={registerData.faucetStationProvincia ? registerData.faucetStationProvincia : ''}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
								<InputLabel> Selecciona un Distrito </InputLabel>
								<Dropdown
									value={registerData.faucetStationDistrito}
									onChange={handleDistrictChange}
									options={district}
									optionLabel="name"
									placeholder={ registerData.faucetStationDistrito !== "" ? registerData.faucetStationDistrito : "Selecciona un Distrito" }
									className="w-full md:w-14rem"
									name={"faucetStationDistrito"}
								/>
							</div>
						</SectionStructure>
					</div>

					{services && (
						<div className={style.container}>
							<ServicioItem labels={labels} services={services} setServices={setServices} />
						</div>
					)}
					<div className={style.buttonContainer}>
						<Button label="Aceptar Cambios" raised onClick={handleSubmit} />
					</div>
				</MainContentStructure>
			)}
		</>
	);
};

export default Configuration;
