import { Dialog } from "primereact/dialog";

export const PrimeModal = ({ modalStatus, onHideModal, children, header, width = 600 }) => {
	return (
		<Dialog
			header={header}
			visible={modalStatus}
			modal
			draggable={false}
			style={{ width: `${width}px` }}
			onHide={onHideModal}
			dismissableMask={true}
		>
			{children}
		</Dialog>
	);
};
