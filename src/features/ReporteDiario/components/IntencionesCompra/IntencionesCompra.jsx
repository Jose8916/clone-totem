import React from "react";
import DataTable from "../../components/DataTable/DataTable";

export const IntencionesCompra = ({ data = [] }) => {
	const titles = {
		main: "",
		subtitles: ["# de transacciones", "%", "Total Galones", "Total PEN"],
	};

	return (
		<div>
			<h2>Intenciones de compra:</h2>
			<DataTable titles={titles} data={data} />
		</div>
	);
};
