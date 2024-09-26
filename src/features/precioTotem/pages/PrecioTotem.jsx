import { useState, useEffect } from "react";
import style from "./PrecioTotem.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

import { EscogerOpcion } from "./components/escogerOpcion/escogerOpcion";
import { PrecioFisico } from "./components/precioFisico/precioFisico";

import { TablaSeleccionadora } from "./components/TablaSeleccionadora/TablaSeleccionadora";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePaymentSelection } from "@/hooks/usePaymentSelection";
import { usePostFetch } from "@/hooks/usePostFetch";

export const PrecioTotem = () => {
	// *--Precio totem fisico--*
	const preciosTotemFisicoFetch = useGetFetch("/physical-prices-my-totem/unico");
	const preciosTotemFisicoPost = usePostFetch(
		"/physical-prices-my-totem/unico",
		"Precio Físico",
		preciosTotemFisicoFetch.reloadFetchData
	);
	const [fuelsPrice, setFuelsPrice] = useState({});

	useEffect(() => {
		if (preciosTotemFisicoFetch.data) {
			setFuelsPrice(preciosTotemFisicoFetch?.data);
		}
	}, [preciosTotemFisicoFetch.data]);

	const [statusButtonUpdateFuels, setStatusButtonUpdateFuels] = useState(false);

	const handleChange = (e) => {
		setStatusButtonUpdateFuels(true);
		if (e.target.value < 0) return;

		setFuelsPrice((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const onUpdateFuels = () => {
		// aqui va el post para crear nuevo fuel
		if (
			fuelsPrice.priceDiesel <= 0 ||
			fuelsPrice.priceGLP <= 0 ||
			fuelsPrice.pricePremium <= 0 ||
			fuelsPrice.priceRegular <= 0 ||
			fuelsPrice.priceGNV <= 0
		) {
			alert("Solo se permite valores mayores a 0");
			return;
		}
		const newData = {
			priceDiesel: parseFloat(fuelsPrice.priceDiesel),
			priceGLP: parseFloat(fuelsPrice.priceGLP),
			pricePremium: parseFloat(fuelsPrice.pricePremium),
			priceRegular: parseFloat(fuelsPrice.priceRegular),
			priceGNV: parseFloat(fuelsPrice.priceGNV),
		};

		preciosTotemFisicoPost.postFetchData(newData);

		setStatusButtonUpdateFuels(false);
		// preciosMiTotemFetch.reloadFetchData();
	};

	// *--Get de Precios mitotem--*
	const preciosMiTotemFetch = useGetFetch("/price-my-totem/find-all-web-admin");

	// --Selección de tablas para mostrar--
	const {
		fuelSelection,
		paymentSelection,
		handleChangeFuel,
		handleChangePayment,
		statusTableFuels,
		setStatusTableFuels,
	} = usePaymentSelection();

	// --Funcion para poder mostrar la tabla--
	const mostrarTablaSeleccionada = (selectedFuel, selectedPayment) => {
		if (selectedFuel === null) {
			return;
		}

		const mostrarTabla = statusTableFuels.map((tabla) => {
			const isSelected =
				selectedFuel.includes(tabla?.combustible) && tabla.tipo_pago === selectedPayment;
			return { ...tabla, mostrar: isSelected };
		});

		setStatusTableFuels(mostrarTabla);
	};

	useEffect(() => {
		mostrarTablaSeleccionada(fuelSelection, paymentSelection);
	}, [fuelSelection, paymentSelection]);

	// --lista de tipos de combustible, para sacar el id
	const listaCombustiblesId = useGetFetch("/fuels");
	const listaPagosId = useGetFetch("/payment-format");

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Configuración de Precio MiTotem</h2>
				<div>
					<h3>Precio Totem Físico:</h3>
					<p>*Mantén siempre actualizado el tótem físico por galón, este precio incluye IGV.</p>
				</div>
				<div>
					<PrecioFisico
						fuels={fuelsPrice}
						handleChange={handleChange}
						buttonController={statusButtonUpdateFuels}
						onUpdateFuels={onUpdateFuels}
					/>
					<hr />

					<EscogerOpcion
						fuelSelection={fuelSelection}
						paymentSelection={paymentSelection}
						handleChangeFuel={handleChangeFuel}
						handleChangePayment={handleChangePayment}
					/>

					<div className={style.preciosMiTotem__container}>
						{statusTableFuels &&
							statusTableFuels.map((tabla) =>
								tabla.mostrar ? (
									<TablaSeleccionadora
										key={tabla.id}
										title={`${tabla.combustible} - ${tabla.tipo_pago}`}
										listaPrecioFisico={fuelsPrice}
										combustible={tabla.combustible}
										listaCombustiblesId={listaCombustiblesId?.data}
										// para sacar id
										tipo_pago={tabla.tipo_pago}
										listaPagosId={listaPagosId?.data}
										// Para refrescar las tablas
										preciosMiTotemFetch={preciosMiTotemFetch}
										tabla={tabla}
									/>
								) : null
							)}
					</div>
				</div>
			</MainContentStructure>
		</>
	);
};
