import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";

export const PrimeDataTable = ({ columns, data, onUpdate, onDelete, onEye, onNiubiz = false }) => {
	const [dataTable, setDataTable] = useState(data);

	useEffect(() => {
		setDataTable(data);
	}, [data]);

	const buttonSuccess = (rowData) => {
		return (
			<Button
				className="p-button-info p-button-rounded"
				style={{ width: "30px", height: "30px" }}
				type="button"
				icon="pi pi-pencil"
				onClick={() => onUpdate(rowData)}
			/>
		);
	};

	const buttonDecline = (rowData) => {
		return (
			<Button
				className="p-button-danger p-button-rounded"
				style={{ width: "30px", height: "30px" }}
				type="button"
				icon="pi pi-ban"
				onClick={() => {
					onDelete(rowData);
				}}
			/>
		);
	};

	const buttonEye = (rowData) => {
		return (
			<Button
				className="p-button-help p-button-rounded"
				style={{ width: "30px", height: "30px" }}
				type="button"
				icon="pi pi-eye"
				onClick={() => {
					onEye(rowData._id);
				}}
			/>
		);
	};

	const buttonNiubiz = (rowData) => {
		if (rowData?.niubizData) {
			return (
				<Button
					className="p-button-help p-button-rounded"
					style={{ width: "30px", height: "30px" }}
					type="button"
					icon="pi pi-eye"
					onClick={() => {
						onNiubiz(rowData);
					}}
				/>
			);
		}
		return <></>;
	};

	return (
		<>
			<DataTable
				value={dataTable}
				paginator
				size="small"
				rows={20}
				rowsPerPageOptions={[15, 20, 30, 50]}
				dataKey="id"
				emptyMessage={<div style={{ textAlign: "center", padding: "10px 0 10px 0" }}>No se han encontrado resultados.</div>}
			>
				{columns &&
					columns.map((column, index) => (
						<Column
							key={`${column.campo + index}`}
							field={column.campo}
							body={column.body}
							header={column.nombre}
							style={{
								minWidth: "100px",
								fontSize: "13px",
								padding: "4px 5px"
							}}
							sortable
						/>
					))}

				{/* Botones para verificar transacciones */}
				{onUpdate && <Column style={{ width: "5rem" }} body={buttonSuccess} />}
				{onEye && <Column style={{ width: "5rem" }} body={buttonEye} />}
				{onDelete && <Column style={{ width: "5rem" }} body={buttonDecline} />}
				{onNiubiz && <Column style={{ width: "5rem" }} body={buttonNiubiz} />}
			</DataTable>
		</>
	);
};
