import { useState } from "react";
export const usePaymentSelection = () => {
	const [fuelSelection, setFuelSelection] = useState(["PREMIUM", "REGULAR"]);
	const [paymentSelection, setPaymentSelection] = useState("TARJETA");

	const [statusTableFuels, setStatusTableFuels] = useState([
		{
			id: 1,
			// mostrar: true,
			tipo_pago: "TARJETA",
			combustible: "PREMIUM",
		},
		{
			id: 3,
			// mostrar: false,
			tipo_pago: "TARJETA",
			combustible: "REGULAR",
		},
		{
			id: 2,
			// mostrar: false,
			tipo_pago: "TARJETA",
			combustible: "DIESEL",
		},
		{
			id: 4,
			// mostrar: false,
			tipo_pago: "TARJETA",
			combustible: "GLP",
		},
		{
			id: 8,
			// mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "PREMIUM",
		},
		{
			id: 6,
			// mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "REGULAR",
		},
		{
			id: 7,
			// mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "DIESEL",
		},
		{
			id: 5,
			// mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "GLP",
		},

		{
			id: 9,
			// mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "PREMIUM",
		},
		{
			id: 11,
			// mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "REGULAR",
		},
		{
			id: 10,
			// mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "DIESEL",
		},
		{
			id: 12,
			// mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "GLP",
		},
		{
			id: 13,
			// mostrar: false,
			tipo_pago: "TARJETA",
			combustible: "GNV",
		},
		{
			id: 14,
			// mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "GNV",
		},
		{
			id: 15,
			// mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "GNV",
		}
	]);

	const handleChangeFuel = (selectedFuel) => {
		if (selectedFuel.length === 0) {
			return;
		}
		setFuelSelection(selectedFuel);
	};

	const handleChangePayment = (selectedPayment) => {
		if (selectedPayment === null) {
			return;
		}
		setPaymentSelection(selectedPayment);
	};

	return {
		fuelSelection,
		paymentSelection,
		handleChangeFuel,
		handleChangePayment,
		statusTableFuels,
		setStatusTableFuels,
	};
};
