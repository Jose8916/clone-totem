import React from "react";
import style from "./SelectField.module.css";

import { InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const SelectField = ({
	textLabel,
	value,
	name,
	textDefault = "Seleccione una opción",
	onChange,
	options,
	valueOption, //parametro que recibe el valor de la opcion seleccionada
	textOption, //parametro que recibe el texto de la opcion seleccionada
	filterBy, //propiedad para filtrar las opciones (por ejemplo: "department")
	filterValue, //valor para filtrar las opciones (por ejemplo: "LIMA")
}) => {
	// Filtrar las opciones si existe un filtro
	const filteredOptions = filterBy && filterValue ? options.filter(option => option[filterBy] === filterValue) : options;

	return (
		<div className={style.column__item}>
			<InputLabel>{textLabel}</InputLabel>

			<Select size="small" value={value || ""} name={name} onChange={onChange} displayEmpty>
				<MenuItem value="" disabled>
					{textDefault}
				</MenuItem>
				{filteredOptions &&
					filteredOptions.map((option) => (
						<MenuItem key={option.id} value={option[valueOption]}>
							{option[textOption]}
						</MenuItem>
					))}
			</Select>
		</div>
	);
};
