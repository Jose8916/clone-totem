import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";
import style from "./DataTable.module.css";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";

export const DataTable = ({
	isHeaderActive = true,
	columns,
	data,
	textAddButton,
	onAddModal = true,
	onUpdate = true,
	onDelete = true,
	onEye,
	isExport = true,
	isSearch = true,
	children,
	onExport,
	onNiubiz,
}) => {
	return (
		<SectionStructure className={style.tableContainer}>
			{isHeaderActive ? (
				<HeaderDataTable
					isExport={isExport}
					isSearch={isSearch}
					textAddButton={textAddButton ? textAddButton : null}
					onAddModal={onAddModal}
					onExport={onExport}
				/>
			) : null}

			{/* Tabla */}
			<PrimeDataTable
				columns={columns}
				data={data}
				onUpdate={onUpdate}
				onDelete={onDelete}
				onEye={onEye}
				onNiubiz={onNiubiz}
			/>

			{children ? <div>{children}</div> : null}
		</SectionStructure>
	);
};
