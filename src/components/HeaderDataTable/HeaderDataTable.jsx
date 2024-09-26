import style from "./HeaderDataTable.module.css";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const HeaderDataTable = ({
	textAddButton,
	onAddModal,
	isExport,
	isSearch,
	additionalElementRight,
	onExport,
}) => {
	return (
		<Toolbar
			className="mb-4"
			start={
				<div className={style.buttonsLeft__container}>
					{textAddButton ? (
						<Button
							label={textAddButton}
							icon="pi pi-plus"
							className="p-button-sm p-button-info mr-2"
							onClick={onAddModal}
						/>
					) : null}

					{isExport ? (
						<Button
							label="EXPORTAR EXCEL"
							icon="pi pi-file-excel"
							className="p-button-sm p-button-success mr-2"
							onClick={onExport}
						/>
					) : null}
				</div>
			}
			end={
				<>
					{isSearch ? (
						<div className="flex justify-content-end">
							<span className="p-input-icon-left">
								<i className="pi pi-search" />
								<InputText type="search" placeholder="Buscar..." />
							</span>
						</div>
					) : null}
					{additionalElementRight ? additionalElementRight : null}
				</>
			}
		/>
	);
};
