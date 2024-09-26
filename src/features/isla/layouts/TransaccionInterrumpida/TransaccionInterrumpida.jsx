import React, { useState } from "react";
import style from "./TransaccionInterrumpida.module.css";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "@/store/slices/isla/islaSlice";
import axios from "axios";
import { url } from "@/connections/mainApi";

const TransaccionInterrumpida = ({ reiniciarCronometro, detenerCronometro }) => {
	const dispatch = useDispatch();
	const loginData = useSelector((state) => state.auth?.login?.token);
	const { detalleTransaccion, cod_compra, placa } = useSelector((state) => state.isla);

	const [masSolicitado, setMasSolicitado] = useState({
		isSelect: false,
		detalles: "",
		cantidad: "",
	});

	const [menosSolicitado, setMenosSolicitado] = useState({
		isSelect: false,
		detalles: "",
		cantidad: "",
	});

	const [otroMotivo, setOtroMotivo] = useState({
		isSelect: false,
		detalles: "",
		cantidad: "",
	});

	const handleRadioButtonChange = (label, grupo) => {
		if (grupo === "masSolicitado") {
			setMasSolicitado({
				isSelect: true,
				detalles: label,
				cantidad: masSolicitado.cantidad,
			});
			setMenosSolicitado({
				isSelect: false,
				detalles: "",
				cantidad: "",
			});
			setOtroMotivo({
				isSelect: false,
				detalles: "",
				cantidad: "",
			});
		} else if (grupo === "menosSolicitado") {
			setMasSolicitado({
				isSelect: false,
				detalles: "",
				cantidad: "",
			});
			setMenosSolicitado({
				isSelect: true,
				detalles: label,
				cantidad: menosSolicitado.cantidad,
			});
			setOtroMotivo({
				isSelect: false,
				detalles: "",
				cantidad: "",
			});
		} else if (grupo === "otroMotivo") {
			setMasSolicitado({
				isSelect: false,
				detalles: "",
				cantidad: "",
			});
			setMenosSolicitado({
				isSelect: false,
				detalles: "",
				cantidad: "",
			});
			setOtroMotivo({
				isSelect: true,
				detalles: label,
				cantidad: otroMotivo.cantidad,
			});
		}
	};

	const handleInputChange = (e, grupo) => {
		if (grupo === "masSolicitado") {
			setMasSolicitado({
				...masSolicitado,
				cantidad: e.target.value,
			});
		} else if (grupo === "menosSolicitado") {
			setMenosSolicitado({
				...menosSolicitado,
				cantidad: e.target.value,
			});
		} else if (grupo === "otroMotivo") {
			setOtroMotivo({
				...otroMotivo,
				cantidad: e.target.value,
			});
		}
	};

	const interrumpirOperacion = async (id) => {
		let data = {};
		if (masSolicitado.isSelect) {
			const { isSelect, ...restData } = masSolicitado;
			data = { ...restData, codigo: cod_compra, placa: placa };
		}
		if (menosSolicitado.isSelect) {
			const { isSelect, ...restData } = menosSolicitado;
			data = { ...restData, codigo: cod_compra, placa: placa };
		}

		if (otroMotivo.isSelect) {
			const { isSelect, ...restData } = otroMotivo;
			data = { ...restData, codigo: cod_compra, placa: placa };
		}

		const resp = await axios.patch(`${url}/transaccion/isla/anular-compra/${id}`, data, { headers: { Authorization: `Bearer ${loginData}` } });

		if (resp.status === 200) {
			dispatch(resetState());
			reiniciarCronometro();
			detenerCronometro();
		}
	};

	return (
		<div className={style.container}>
			<h2 className={style.title}>
				Transacción interrumpida
				<br />
				¿Qué sucedió?
			</h2>

			<div className={style.radio__item}>
				<RadioButton
					inputId="masSolicitado"
					name="transaccion"
					value={masSolicitado.isSelect}
					checked={masSolicitado.isSelect}
					onChange={() =>
						handleRadioButtonChange("Se despachó más de lo solicitado.", "masSolicitado")
					}
				/>
				<label>Se despachó más de lo solicitado</label>
				<InputText
					onChange={(e) => handleInputChange(e, "masSolicitado")}
					value={masSolicitado.cantidad}
					name="cantidad"
					disabled={!masSolicitado.isSelect}
				/>
			</div>
			<div className={style.radio__item}>
				<RadioButton
					inputId="despachadoMenos"
					name="transaccion"
					value={menosSolicitado.isSelect}
					checked={menosSolicitado.isSelect}
					onChange={() =>
						handleRadioButtonChange("Se despachó menos de lo solicitado.", "menosSolicitado")
					}
				/>
				<label>Se despachó menos de lo solicitado</label>
				<InputText
					onChange={(e) => handleInputChange(e, "menosSolicitado")}
					value={menosSolicitado.cantidad}
					name="cantidad"
					disabled={!menosSolicitado.isSelect}
				/>
			</div>
			<div className={style.radio__item}>
				<RadioButton
					inputId="otroMotivo"
					name="transaccion"
					value={otroMotivo.isSelect}
					checked={otroMotivo.isSelect}
					onChange={() => handleRadioButtonChange("Otro motivo:", "otroMotivo")}
				/>
				<label>Otro motivo</label>
				<InputText
					onChange={(e) => handleInputChange(e, "otroMotivo")}
					value={otroMotivo.cantidad}
					name="cantidad"
					disabled={!otroMotivo.isSelect}
				/>
			</div>
			<Button
				label="Enviar comentarios"
				onClick={() => interrumpirOperacion(detalleTransaccion?.id)}
			/>
		</div>
	);
};

export default React.memo(TransaccionInterrumpida);
