import { useState, useEffect, useMemo, useCallback } from "react";

export const useCronometro = (tiempoInicial) => {
	const [tiempoRestante, setTiempoRestante] = useState(obtenerTiempoFormateado(tiempoInicial));
	const [corriendo, setCorriendo] = useState(false);
	const [tiempoAgotado, setTiempoAgotado] = useState(false);

	useEffect(() => {
		let intervalo;

		if (corriendo) {
			intervalo = setInterval(() => {
				setTiempoRestante((prevTiempo) => {
					const segundos = convertirTiempoAsegundos(prevTiempo);
					if (segundos > 0) {
						const nuevoTiempo = segundos - 1;
						const nuevoTiempoFormateado = obtenerTiempoFormateado(nuevoTiempo);
						if (nuevoTiempo === 0) {
							setTiempoAgotado(true);
							setCorriendo(false);
							clearInterval(intervalo);
						}
						return nuevoTiempoFormateado;
					} else {
						setTiempoAgotado(true);
						setCorriendo(false);
						clearInterval(intervalo);

						return obtenerTiempoFormateado(0);
					}
				});
			}, 1000);
		}

		return () => clearInterval(intervalo);
	}, [corriendo]);

	const iniciarCronometro = useCallback(() => {
		setCorriendo(true);
		setTiempoAgotado(false);
	}, []);

	const detenerCronometro = useCallback(() => {
		setCorriendo(false);
		setTiempoRestante(obtenerTiempoFormateado(tiempoInicial));
		setTiempoAgotado(false);
	}, []);

	const reiniciarCronometro = useCallback(() => {
		setCorriendo(false);
		setTiempoRestante(obtenerTiempoFormateado(tiempoInicial));
		setTiempoAgotado(false);
		iniciarCronometro();
	}, []);

	function convertirTiempoAsegundos(tiempo) {
		const [minutos, segundos] = tiempo.split(":");
		return parseInt(minutos, 10) * 60 + parseInt(segundos, 10);
	}

	function obtenerTiempoFormateado(segundos) {
		const minutos = Math.floor(segundos / 60);
		const segundosRestantes = segundos % 60;
		return `${minutos < 10 ? "0" : ""}${minutos}:${
			segundosRestantes < 10 ? "0" : ""
		}${segundosRestantes}`;
	}

	// Memoizamos el objeto de retorno del hook
	const memoizedHook = useMemo(
		() => ({
			tiempoRestante,
			corriendo,
			tiempoAgotado,
			iniciarCronometro,
			detenerCronometro,
			reiniciarCronometro,
		}),
		[tiempoRestante, corriendo, tiempoAgotado]
	);

	return memoizedHook;
};
