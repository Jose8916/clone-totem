import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import style from "./ParametrosSistema.module.css";
import { url } from "@/connections/mainApi";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";

function ParametrosSistema() {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [snackState, setSnackState] = useState({ open: false, vertical: 'bottom', horizontal: 'center', message: '' });
	const { vertical, horizontal, open, message } = snackState;
	const fuelOrder = ['PREMIUM', 'REGULAR', 'DIESEL', 'GLP', 'GNV'];
	const [maxGallonsData, setMaxGallonsData] = useState([]);
	const [maxDiscountAmountData, setMaxDiscountAmount] = useState([]);
	const [maxDiscountPercentageData, setMaxDiscountPercentage] = useState([]);

	useEffect(() => { 
		fetchMaxSupplyOfGallons();
		fetchMaxDiscountAmount();
		fetchMaxDiscountPercentage();
	}, []);

	const handleSnackBarClose = () => { setSnackState({ ...snackState, open: false }); };

	const fetchMaxSupplyOfGallons = async () => {
		try {
			const response = await axios.get(`${url}/maximum-supply-of-gallons`, { headers: { Authorization: `Bearer ${loginData}` } });
			const orderedData = response.data.sort((a, b) => {
                return fuelOrder.indexOf(a.fuel.fuelName) - fuelOrder.indexOf(b.fuel.fuelName);
            });
			setMaxGallonsData(orderedData);
		} catch (error) {
			throw new Error("Error al cargar los galones maximos.");
		}
	};

	const fetchMaxDiscountAmount = async () => {
		try {
			const response = await axios.get(`${url}/maximum-discount-amount`, { headers: { Authorization: `Bearer ${loginData}` } });
			const orderedData = response.data.sort((a, b) => {
                return fuelOrder.indexOf(a.fuel.fuelName) - fuelOrder.indexOf(b.fuel.fuelName);
            });
			setMaxDiscountAmount(orderedData);
		} catch (error) {
			throw new Error("Error al cargar los galones maximos.");
		}
	};

	const fetchMaxDiscountPercentage = async () => {
		try {
			const response = await axios.get(`${url}/maximum-discount-percentage`, { headers: { Authorization: `Bearer ${loginData}` } });
			setMaxDiscountPercentage(response.data);
		} catch (error) {
			throw new Error("Error al cargar los galones maximos.");
		}
	};

	const handleMaxGallonsChange = async (fuelId, value, event) => {
		try {
			if (event.key === "Enter") {
				const data = {
					fuelId: fuelId,
					maxGallons: parseFloat(value)
				};
				await axios.post(`${url}/maximum-supply-of-gallons/`, data, { headers: { Authorization: `Bearer ${loginData}` } });
				setSnackState({ ...snackState, open: true, message: 'Se modifico exitosamente.' });
			}
		} catch (error) {
		  console.error("Error al actualizar los datos:", error);
		}
	};

	const handleMaxDiscountAmoutChange = async (fuelId, value, event) => {
		try {
			if (event.key === "Enter") {
				const data = {
					fuelId: fuelId,
					maxAmount: parseFloat(value)
				};
				await axios.post(`${url}/maximum-discount-amount/`, data, { headers: { Authorization: `Bearer ${loginData}` } });
				setSnackState({ ...snackState, open: true, message: 'Se modifico exitosamente.' });
			}
		} catch (error) {
		  console.error("Error al actualizar los datos:", error);
		}
	};

	const handleMaxDiscountPercentageChange = async (value, event) => {
		try {
			if (event.key === "Enter") {
				const data = {
					maxPercentage: parseInt(value)
				};
				await axios.post(`${url}/maximum-discount-percentage/`, data, { headers: { Authorization: `Bearer ${loginData}` } });
				setSnackState({ ...snackState, open: true, message: 'Se modifico exitosamente.' });
			}
		} catch (error) {
		  console.error("Error al actualizar los datos:", error);
		}
	};

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Parametros del Sistema</h2>
				<hr />
				<SectionStructure className={style.additionalClassName}>
					<div className={style.parameterContainer}>
						<h3 className={style.titleStyle}>Volumen maximo para la oferta de galones:</h3>
						<p className={style.descriptionStyle}>Este parámetro controla el volumen máximo de galones ofrecido por el tipo de combustible por día, quiere decir que cada día se puede ofertar hasta esta cantidad de galones.</p>
						<div className={style.itemsList}>
							{maxGallonsData.map((maxGallonItem) => (
								<div className={style.itemContainer} key={maxGallonItem.id}>
									<label 
										className={style.labelStyle} 
										htmlFor={maxGallonItem.fuel.fuelName}
									>{maxGallonItem.fuel.fuelName}:</label>
									<input 
										className={style.inputStyle}
										type="text"
										defaultValue={maxGallonItem.maxGallons}
										onKeyDown={(event) => handleMaxGallonsChange(maxGallonItem.fuel.id, event.target.value, event)}
										placeholder={`00.000`}
									/> gal
								</div>
							))}
						</div>
					</div>
				</SectionStructure>
				<hr />
				<SectionStructure className={style.additionalClassName}>
					<div className={style.parameterContainer}>
						<h3 className={style.titleStyle}>Monto de descuento máximo:</h3>
						<p className={style.descriptionStyle}>Este parámetro controla valor máximo de descuento ofrecido por el tipo de combustible del totem fisico, quiere decir que para cada rango de descuento elegido no se podrá superar este valor.</p>
						<div className={style.itemsList}>
							{maxDiscountAmountData.map((maxDiscountAmountItem) => (
								<div className={style.itemContainer} key={maxDiscountAmountItem.id}>
									<label 
										className={style.labelStyle} 
										htmlFor={maxDiscountAmountItem.fuel.fuelName}
									>{maxDiscountAmountItem.fuel.fuelName}:</label>
									S/. <input 
										className={style.inputStyle}
										type="text"
										defaultValue={maxDiscountAmountItem.maxAmount}
										onKeyDown={(event) => handleMaxDiscountAmoutChange(maxDiscountAmountItem.fuel.id, event.target.value, event)}
										placeholder={`00.00`}
									/>
								</div>
							))}
						</div>
					</div>
				</SectionStructure>
				<hr />
				<SectionStructure>
					<div className={style.parameterContainer}>
						<h3 className={style.titleStyle}>Procentaje de descuento máximo:</h3>
						<p className={style.descriptionStyle}>Este parámetro controla porcentaje máximo de descuento ofrecido por el tipo de combustible del totem fisico, quiere decir que para cada rango de descuento elegido no se podrá superar este valor.</p>
						{maxDiscountPercentageData.map((maxDiscountPercentageItem) => (
							<div key={maxDiscountPercentageItem.id}>
								<label 
									className={style.labelStyle} 
									htmlFor="porcentaje maximo"
								>Porcentaje máximo:</label>
								<input 
									className={style.inputStyle}
									type="text"
									defaultValue={maxDiscountPercentageItem.maxPercentage}
									onKeyDown={(event) => handleMaxDiscountPercentageChange(event.target.value, event)}
									placeholder={`00`}
								/> %
							</div>
						))}
					</div>
				</SectionStructure>
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={open}
					onClose={handleSnackBarClose}
					autoHideDuration={3000}
					TransitionComponent={Slide}
					key={vertical + horizontal}
				> 
					<Alert
						onClose={handleSnackBarClose}
						severity="success"
						variant="filled"
						sx={{ width: '100%' }}
					>
						{message}
					</Alert>
				</Snackbar>
			</MainContentStructure>
		</>
	);
}

export default ParametrosSistema;
