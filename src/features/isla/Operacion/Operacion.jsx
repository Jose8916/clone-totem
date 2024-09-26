import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../layouts/Login/Login";

import { useCronometro } from "@/hooks/useCronometro";
import { IslaHeader } from "@/components/IslaHeader/IslaHeader";
import { IslaContentStructure } from "@/components/IslaContentStructure/IslaContentStructure";
import IngresarCodigo from "../layouts/IngresarCodigo/IngresarCodigo";
import DatosTransaccion from "../layouts/DatosTransaccion/DatosTransaccion";
import ConfirmarTransaccion from "../layouts/ConfirmarTransaccion/ConfirmarTransaccion";
import TransaccionInterrumpida from "../layouts/TransaccionInterrumpida/TransaccionInterrumpida";
import { addEtapa, onLoading } from "@/store/slices/isla/islaSlice";
import useModal from "@/hooks/useModal";
import { AddModal } from "./AddModal/AddModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";

export const Operacion = () => {
	const dispatch = useDispatch();
	const { onVisibleModal, onHideModal, modalStatus } = useModal();
	const { etapa, rechazado, loading } = useSelector((state) => state.isla);

	const {
		tiempoRestante,
		corriendo,
		iniciarCronometro,
		detenerCronometro,
		reiniciarCronometro,
		tiempoAgotado,
	} = useCronometro(300);

	const nextStep = useCallback((etapa) => {
		if (loading) return;
		dispatch(onLoading());
		dispatch(addEtapa(etapa));
	}, []);

	useEffect(() => {
		if (etapa === 2 && corriendo === false) {
			iniciarCronometro();
		}
	}, [etapa]);

	useEffect(() => {
		if (tiempoAgotado) {
			onVisibleModal();
		}
	}, [tiempoAgotado]);

	const handleResetCronometro = () => {
		reiniciarCronometro();
		onHideModal();
	};

	return (
		<>
			<IslaHeader />
			<IslaContentStructure>
				{!rechazado ? (
					<>
						{etapa === 1 && <Login nextStep={nextStep} />}
						{etapa === 2 && <IngresarCodigo nextStep={nextStep} />}
						{etapa === 3 && <DatosTransaccion nextStep={nextStep} />}
						{etapa === 4 && (
							<ConfirmarTransaccion
								nextStep={nextStep}
								tiempoRestante={tiempoRestante}
								reiniciarCronometro={reiniciarCronometro}
								detenerCronometro={detenerCronometro}
							/>
						)}
					</>
				) : (
					<TransaccionInterrumpida
						reiniciarCronometro={reiniciarCronometro}
						detenerCronometro={detenerCronometro}
					/>
				)}
			</IslaContentStructure>

			<PrimeModal
				header="Tiempo agotado"
				modalStatus={modalStatus}
				onHideModal={handleResetCronometro}
			>
				<AddModal postFetchData={handleResetCronometro} />
			</PrimeModal>
		</>
	);
};
