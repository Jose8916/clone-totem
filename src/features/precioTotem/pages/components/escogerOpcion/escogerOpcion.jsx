import PrimeMultiSelection from "@/primeComponents/PrimeMultiSelection/PrimeMultiSelection";
import style from "./escogerOpcion.module.css";

export function EscogerOpcion({
	fuelSelection,
	paymentSelection,
	handleChangeFuel,
	handleChangePayment,
}) {
	const fuels = [
		{ name: "Premium", value: "PREMIUM" },
		{ name: "Regular", value: "REGULAR" },
		{ name: "Diesel", value: "DIESEL" },
		{ name: "GLP", value: "GLP" },
		{ name: "GNV", value: "GNV" },
	];

	const payments = [
		{ name: "Tarjeta", value: "TARJETA" },
		{ name: "Yape/Plin", value: "YAPE/PLIN" },
		{ name: "Efectivo", value: "EFECTIVO" },
	];

	return (
		<div className={style.container__main}>
			<div className={style.container__1}>
				<h4> Escoge el combustible: </h4>

				<PrimeMultiSelection
					options={fuels}
					value={fuelSelection}
					handleChange={handleChangeFuel}
				/>
			</div>

			<div className={style.container__1}>
				<h4> Forma de Pago: </h4>

				<PrimeMultiSelection
					options={payments}
					value={paymentSelection}
					handleChange={handleChangePayment}
					multiple={false}
				/>
			</div>
		</div>
	);
}
