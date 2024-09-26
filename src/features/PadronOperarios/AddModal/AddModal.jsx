import { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";

const initialData = {
	operarioDni: "",
	operarioName: "",
	operarioLastName: "",
	operarioLastNameMother: "",
};

export const AddModal = ({ postFetchData, updateFetchData, updateData }) => {
	const [newData, setNewData] = useState(initialData);

	const handleCreate = async () => {
		try {
			await postFetchData(newData);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		const { id, operarioDni, faucetStation, ...restData } = newData;
		// revisar
		try {
			if (updateData) {
				await updateFetchData(updateData.id, restData);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Seteando el estado del input al data si existe el update
	useEffect(() => {
		if (updateData) {
			setNewData(updateData);
		}
	}, [updateData]);

	const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            !updateData ? handleCreate() : handleUpdate();
        }
    };

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Documento:"
				value={newData.operarioDni || ""}
				name="operarioDni"
				onChange={(e) => handleChangeInput(e, setNewData)}
				disabled={updateData}
				onKeyDown={handleKeyEnter}
			/>

			<TextBoxField
				textLabel="Nombre:"
				value={newData.operarioName || ""}
				name="operarioName"
				onChange={(e) => handleChangeInput(e, setNewData)}
				onKeyDown={handleKeyEnter}
			/>

			<TextBoxField
				textLabel="Apellido paterno:"
				value={newData.operarioLastName || ""}
				name="operarioLastName"
				onChange={(e) => handleChangeInput(e, setNewData)}
				onKeyDown={handleKeyEnter}
			/>

			<TextBoxField
				textLabel="Apellido materno:"
				value={newData.operarioLastNameMother || ""}
				name="operarioLastNameMother"
				onChange={(e) => handleChangeInput(e, setNewData)}
				onKeyDown={handleKeyEnter}
			/>

			<div>
				<Button
					className="p-button-sm p-button-info mr-2"
					onClick={!updateData ? handleCreate : handleUpdate}
				>
					{!updateData ? "AGREGAR OPERARIO" : "EDITAR OPERARIO"}
				</Button>
			</div>
		</div>
	);
};
