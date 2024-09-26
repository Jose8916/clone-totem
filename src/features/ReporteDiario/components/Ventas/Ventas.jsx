import React from "react";
import DataTable from "../../components/DataTable/DataTable";

export const Ventas = ({ data = [] }) => {
	const titles = {
		main: "",
		subtitles: ["# de GL", "%", "Precio Promedio /gal", "Total PEN", "%"],
	};

	return (
		<div>
			<h2>Ventas:</h2>
			<DataTable titles={titles} data={data} />
		</div>
	);
};
