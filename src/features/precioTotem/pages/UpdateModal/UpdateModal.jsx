import React, { useEffect, useState } from "react";
import style from "./UpdateModal.module.css";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";

export const UpdateModal = ({
	updateFetchData,
	infoDataId,
	data = [],
	updateData = [],
	precioFisico,
}) => {
	let numberElements = data.length;
	let lastElementIndex = data.length - 1;

	const [newData, setNewData] = useState({
		id: "",
		priceMyTotemDescuento: 0,
		priceMyTotemDesde: 0,
		priceMyTotemAsta: 0,
		fuelId: "",
		paymentFormatId: "",
	});

	const posicion = data.findIndex((elemento) => elemento.id === newData.id);

	useEffect(() => {
		if (updateData.id) {
			const { discount, endRange, id, startRange } = updateData;
			const { combustible, tipo_pago } = infoDataId;
			setNewData({
				id: id,
				priceMyTotemDescuento: discount,
				priceMyTotemDesde: startRange,
				priceMyTotemAsta: endRange,
				fuelId: combustible?.id,
				paymentFormatId: tipo_pago?.id,
			});
		}
	}, [updateData]);

	const [errorDiscount, setErrorDiscount] = useState("");

	useEffect(() => {
		if (infoDataId) {
			setNewData((prev) => ({
				...prev,
				fuelId: infoDataId?.combustible?.id,
				paymentFormatId: infoDataId?.tipo_pago?.id,
			}));
		}
	}, [infoDataId]);

	const handleUpdate = async () => {
		setErrorDiscount("");
		const dataUpdate = {
			...newData,
			priceMyTotemDescuento: parseFloat(newData.priceMyTotemDescuento),
			priceMyTotemDesde: parseFloat(newData.priceMyTotemDesde),
			priceMyTotemAsta: parseFloat(newData.priceMyTotemAsta),
		};

		// validación de creación
		if (
			!dataUpdate.priceMyTotemDescuento ||
			!dataUpdate.priceMyTotemDesde ||
			!dataUpdate.priceMyTotemAsta
		) {
			setErrorDiscount("Tienes que completar todos los elementos");
			return;
		}
		if (dataUpdate.priceMyTotemDescuento >= precioFisico / 2) {
			setErrorDiscount(
				`El valor del descuento no puede igual o superior al 50% del precio físico: S/. ${precioFisico}`
			);
			return;
		}
		// validar que el descuento, sea mayor al registro anterior
		if (+dataUpdate.priceMyTotemDescuento <= +data[posicion - 1]?.discount) {
			setErrorDiscount(
				`El valor de descuento debe de ser superior al anterior registro: S/. ${
					data[posicion - 1]?.discount
				}`
			);
			return;
		}
		// Validar que el descuento, sea menor al registro siguiente
		if (+dataUpdate.priceMyTotemDescuento >= +data[posicion + 1]?.discount) {
			setErrorDiscount(
				`El valor de descuento debe de ser menor al siguiente registro: S/. ${+data[posicion + 1]
					?.discount}`
			);
			return;
		}
		// validar que el monto desde sea mayor al "hasta" del registro anterior
		if (dataUpdate.priceMyTotemDesde <= data[posicion - 1]?.endRange) {
			setErrorDiscount(
				`El valor DESDE debe de ser mayor al Hasta del descuento anterior: S/. ${(data[
					posicion - 1
				]?.endRange).toFixed(2)}`
			);
			return;
		}

		// validar que el monto de "Hasta" sea menor que el "Desde" del registro siguiente
		if (dataUpdate.priceMyTotemAsta >= data[posicion + 1]?.startRange) {
			setErrorDiscount(
				`El valor de HASTA debe de ser menor al de DESDE del siguiente registro: S/ ${(data[
					posicion + 1
				]?.startRange).toFixed(2)}`
			);
			return;
		}

		// validar que el monto desde sea menor al monto de hasta del descuento
		if (dataUpdate.priceMyTotemAsta <= dataUpdate.priceMyTotemDesde) {
			setErrorDiscount(
				`El valor de HASTA debe de ser mayor al de DESDE: S/. ${dataUpdate.priceMyTotemDesde.toFixed(
					2
				)}`
			);
			return;
		}

		const { id, ...restData } = dataUpdate;

		updateFetchData(id, restData);
	};

	const handleChangeInput = (e) => {
		setNewData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className={style.column__container}>
			<MoneyBoxField
				textLabel="Descuento/gal:"
				value={newData.priceMyTotemDescuento || ""}
				name="priceMyTotemDescuento"
				onChange={handleChangeInput}
				placeholder="0.00"
			/>

			<h3> Rango de Compra</h3>

			<div className={style.container__1}>
				<MoneyBoxField
					textLabel="Desde:"
					value={newData.priceMyTotemDesde || ""}
					name="priceMyTotemDesde"
					onChange={handleChangeInput}
					placeholder="0.00"
				/>

				<MoneyBoxField
					textLabel="Hasta:"
					value={newData.priceMyTotemAsta || ""}
					name="priceMyTotemAsta"
					onChange={handleChangeInput}
					placeholder="0.00"
				/>
			</div>

			{errorDiscount && <p className="msg-error">{errorDiscount}</p>}
			{updateFetchData && (
				<div>
					<Button
						className="p-button-sm p-button-info mr-2"
						onClick={handleUpdate}
						disabled={numberElements < 10 ? false : true}
					>
						ACTUALIZAR DESCUENTO
					</Button>
				</div>
			)}
		</div>
	);
};
