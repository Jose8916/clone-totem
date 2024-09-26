import style from "./DeleteModal.module.css";
import { Button } from "primereact/button";

export const DeleteModal = ({ onHideModal, onDelete, id }) => {
	const deleteRegister = () => {
		onDelete?.(id);
		onHideModal();
	};

	return (
		<div className={style.column__container}>
			<p style={{ textAlign: "center" }}>
				Estas por eliminar un descuento <b>¿deseas continuar?</b>
			</p>

			<div className={style.button__container}>
				<Button label="Sí, continuar" raised onClick={deleteRegister} />
				<Button label="No, volver" raised onClick={onHideModal} />
			</div>
		</div>
	);
};
