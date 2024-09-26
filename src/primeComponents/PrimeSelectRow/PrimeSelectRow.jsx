import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import style from "./PrimeSelectRow.module.css";
import useModal from "@/hooks/useModal";
import { PrimeModal } from "../PrimeModal/PrimeModal";
import { DeleteModal } from "./DeleteModal/DeleteModal";

export function PrimeSelectRow({
	data,
	selectedProduct,
	setSelectedProduct,
	precioFisico,
	onDelete,
	onUpdate,
}) {
	const [idRowData, setIdRowData] = useState("");
	const { modalStatus, onVisibleModal, onHideModal } = useModal();

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
					setIdRowData(rowData.id);
					onVisibleModal();
					// onDelete(rowData.id);
				}}
			/>
		);
	};

	return (
		<>
			<DataTable
				value={data}
				size="small"
				selectionMode="single"
				selection={selectedProduct}
				onSelectionChange={(e) => setSelectedProduct(e.value)}
				dataKey="id"
				metaKeySelection={false}
				tableStyle={{ minWidth: "35rem" }}
				emptyMessage="No se encontro registros."
			>
				<Column
					header="Descuento /gal"
					body={(rowData) => {
						return <div>S/. {rowData.discount}</div>;
					}}
				/>
				<Column
					header="Rango de Compra"
					body={(rowData) => {
						return (
							<div className={style.container__1}>
								{`DE: S/. ${rowData.startRange} - A: S/. ${rowData.endRange}`}
							</div>
						);
					}}
				/>
				<Column
					header="PVP Mitotem /gal"
					body={(rowData) => {
						return (
							<div className={style.container__1}>{`S/. ${(precioFisico - rowData.discount).toFixed(
								2
							)}`}</div>
						);
					}}
				/>

				<Column style={{ width: "70px" }} body={buttonSuccess} />
				<Column style={{ width: "70px" }} body={buttonDecline} />
			</DataTable>
			{/* Confirm Modal */}
			<PrimeModal
				header="Confirmar eliminación"
				modalStatus={modalStatus}
				onHideModal={onHideModal}
			>
				<DeleteModal onHideModal={onHideModal} onDelete={onDelete} id={idRowData} />
			</PrimeModal>
		</>
	);
}
