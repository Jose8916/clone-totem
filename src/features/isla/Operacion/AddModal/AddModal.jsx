import React, { useState } from "react";
import style from "./AddModal.module.css";

import { Button } from "primereact/button";

export const AddModal = ({ postFetchData, updateFetchData, updateData }) => {
	const [newData, setNewData] = useState({
		placa: "",
	});

	const handleCreate = async () => {
		postFetchData();
	};

	return (
		<div className={style.column__container}>
			<p>¡Recuerda que debes terminar tu transacción!</p>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={postFetchData}>
						CONTINUAR
					</Button>
				</div>
			)}
		</div>
	);
};
