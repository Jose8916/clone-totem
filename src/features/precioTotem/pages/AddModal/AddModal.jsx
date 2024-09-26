import React, { useEffect, useState } from "react";
import style from "./AddModal.module.css";
import { Button } from "primereact/button";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";

export const AddModal = ({
	postFetchData,
	updateFetchData,
	updateData,
	infoDataId,
	data = [],
	precioFisico,
}) => {
	let numberElements = data?.length || 0;
	let lastElementIndex = data?.length - 1 || 0;

	const [newData, setNewData] = useState({
		priceMyTotemDescuento: 0,
		priceMyTotemDesde: 0,
		priceMyTotemAsta: 0,
		fuelId: "",
		paymentFormatId: "",
	});

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

	useEffect(() => {
		if (numberElements > 0) {
			setNewData((prev) => ({
				...prev,
				priceMyTotemDesde: +data[lastElementIndex].endRange + 0.01,
			}));
		}
	}, [data]);

	const handleCreate = async () => {
		setErrorDiscount("");
		const dataCreate = {
			...newData,
			priceMyTotemDescuento: parseFloat(newData.priceMyTotemDescuento),
			priceMyTotemDesde: parseFloat(newData.priceMyTotemDesde),
			priceMyTotemAsta: parseFloat(newData.priceMyTotemAsta),
		};

		// validación de creación
		if (
			!dataCreate.priceMyTotemDescuento ||
			!dataCreate.priceMyTotemDesde ||
			!dataCreate.priceMyTotemAsta
		) {
			setErrorDiscount("Tienes que completar todos los elementos");
			return;
		}
		//HardCoded Discount Validation not more than 90%
		if (dataCreate.priceMyTotemDescuento >= (precioFisico * 0.9)) {
			setErrorDiscount(
				`El valor del descuento no puede superar el 90% del precio físico: S/. ${precioFisico}`
			);
			return;
		}
		if (dataCreate.priceMyTotemDescuento <= data[lastElementIndex]?.discount) {
			setErrorDiscount(
				`El valor de descuento debe de ser superior al anterior registro: S/. ${+data[
					lastElementIndex
				]?.discount}`
			);
			return;
		}
		if (dataCreate.priceMyTotemDesde <= data[lastElementIndex]?.endRange) {
			setErrorDiscount(
				`El valor DESDE debe que ser mayor al descuento anterior: S/. ${(+data[lastElementIndex]?.endRange).toFixed(2)}`
			);
			return;
		}
		if (dataCreate.priceMyTotemAsta <= dataCreate.priceMyTotemDesde) {
			setErrorDiscount(
				`El valor de HASTA debe de ser mayor al de DESDE: S/. ${(dataCreate.priceMyTotemDesde).toFixed(2)}`
			);
			return;
		}

		const response = await postFetchData(dataCreate);
		if (response?.message=='Discount price must not exceed the maximum discount amount variable.'){
			setErrorDiscount(`El valor de descuento no debe ser mayor al monto de: S/. ${response?.value}`);
		}
		if (response?.message=='Discount price must not exceed the maximum discount percentag from the physical prices.'){
			setErrorDiscount(`El valor de descuento no debe ser mayor al monto de: S/. ${response?.value}`);
		}
		
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
			{postFetchData && (
				<div>
					<Button
						className="p-button-sm p-button-info mr-2"
						onClick={handleCreate}
						disabled={numberElements < 10 ? false : true}
					>
						AGREGAR DESCUENTO
					</Button>
				</div>
			)}
		</div>
	);
};
