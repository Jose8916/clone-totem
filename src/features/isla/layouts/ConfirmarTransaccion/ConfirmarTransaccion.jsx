import React, { useState } from "react";
import axios from "axios";
import style from "./ConfirmarTransaccion.module.css";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { declineEtapa, resetState } from "@/store/slices/isla/islaSlice";
import { url } from "@/connections/mainApi";

const ConfirmarTransaccion = ({ reiniciarCronometro, detenerCronometro, tiempoRestante }) => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const dispatch = useDispatch();
	const { detalleTransaccion, cod_compra, placa } = useSelector((state) => state.isla);
	const [errorStatusConfirmation, setErrorStatusConfirmation] = useState(null);

	const rechazarOperacion = () => {
		dispatch(declineEtapa());
	};

	const confirmTransaction = async (id) => {
		try {
			const resp = await axios.patch(`${url}/transaccion/isla/validar-compra/${id}`, { placa: placa, codigo: cod_compra }, { headers: { Authorization: `Bearer ${loginData}` } });
			if (resp.status === 200) {
				dispatch(resetState());
				reiniciarCronometro();
				detenerCronometro();
				setErrorStatusConfirmation(false);
			}else{
				setErrorStatusConfirmation(true);
			}
		} catch (error) {
			setErrorStatusConfirmation(true);
		}
	};

	return (
		<div className={style.login__container}>
			<h2 className={style.login__title}>¡Listo, muchas gracias!</h2>
			<p className={style.datetime__text}>Te quedan {tiempoRestante} minutos</p>
			<div className={style.button__container}>
				<Button label="Transacción finalizada" onClick={() => confirmTransaction(detalleTransaccion?.id)} />
				<Button label="Transacción interrumpida" onClick={rechazarOperacion} />
			</div>
			{errorStatusConfirmation === true ? ( <p className={style.errorMessage}>"No se pudo realizar la operación, <br/>contactate con un administrador."</p>) : null}
		</div>
	);
};

export default React.memo(ConfirmarTransaccion);
