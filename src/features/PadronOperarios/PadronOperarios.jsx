import { useState } from "react";
import useModal from "@/hooks/useModal";

import { AddModal } from "./AddModal/AddModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { usePostFetch } from "@/hooks/usePostFetch";

export const PadronOperarios = () => {
	const addModal = useModal();
	const updateModal = useModal();
	const [currentUpdateData, setCurrentUpdateData] = useState(null);

	const { data, reloadFetchData } = useGetFetch("/operario");
	const { postFetchData } = usePostFetch(
		"/auth/registro-web-operario",
		"Operario",
		reloadFetchData,
		addModal
	);
	const { deleteFetchData } = useDeleteFetch("/operario", "Operario", reloadFetchData);
	const { updateFetchData } = useUpdateFetch("/operario", "Operario", reloadFetchData, updateModal);

	const onUpdate = (data) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	const handleDeteleData = (data) => {
		deleteFetchData(data.id);
	};

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Padrón de operarios</h2>
				<hr />

				<DataTable
					textAddButton="AGREGAR OPERARIO"
					isSearch={false}
					columns={columns}
					data={data}
					onAddModal={() => addModal.onVisibleModal()}
					onUpdate={onUpdate}
					onDelete={handleDeteleData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar operario"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar operario"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "Documento", campo: "operarioDni" },
	{ nombre: "Nombre", campo: "operarioName" },
	{ nombre: "Apellido Paterno", campo: "operarioLastName" },
	{ nombre: "Apellido Materno", campo: "operarioLastNameMother" },
];
