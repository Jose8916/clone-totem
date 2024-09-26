import React from "react";
import style from "./MoneyBoxField.module.css";

import { InputNumber } from "primereact/inputnumber";

export const MoneyBoxField = ({
	textLabel,
	value,
	name,
	onChange,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
	placeholder = "",
}) => {
	const styles = {
		width: labelWidth,
		fontSize: "15px",
	};

	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
		>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<InputNumber
				className={`p-inputtext-sm ${style.textbox__field}`}
				inputStyle={{ minWidth: "150px", width: "100%" }}
				value={value}
				name={name}
				onValueChange={onChange}
				disabled={disabled}
				placeholder={placeholder}
				mode="currency"
				currency="PEN"
				locale="es-PE"
			/>
		</div>
	);
};
