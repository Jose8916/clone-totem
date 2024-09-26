import React, { useState } from "react";
import style from "./AddModal.module.css";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

export const AddModal = ({ postFetchData, setIsReplace }) => {
	const [newData, setNewData] = useState({
		placa: "",
	});

	const handleChange = (e) => {
		setNewData({
			[e.target.name]: e.target.value,
		});
	};

	const handleCreate = async () => {
		postFetchData(newData.placa);
		setIsReplace(true);
	};

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Número de placa"
				value={newData.placa || ""}
				name="placa"
				onChange={handleChange}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						CAMBIAR PLACA
					</Button>
				</div>
			)}
		</div>
	);
};
