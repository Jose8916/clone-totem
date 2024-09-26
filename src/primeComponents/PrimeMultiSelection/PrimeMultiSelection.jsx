import React from "react";
import { SelectButton } from "primereact/selectbutton";

export default function PrimeMultiSelection({
	options,
	value: selectedValue,
	handleChange,
	multiple = true,
}) {
	return (
		<div className="card flex justify-content-center">
			<SelectButton
				value={selectedValue}
				onChange={(e) => handleChange(e.value)}
				optionLabel="name"
				options={options}
				multiple={multiple}
			/>
		</div>
	);
}
