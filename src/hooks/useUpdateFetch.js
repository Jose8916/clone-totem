import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";
import { setToast } from "@/store/slices/toast/toastSlice";
import { useDispatch, useSelector } from "react-redux";

export const useUpdateFetch = (endPoint, sectionName, reloadFetchData, addModal) => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const dispatch = useDispatch();
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [errorUpdate, setErrorUpdate] = useState(null);
	const [successUpdate, setSuccessUpdate] = useState(false);

	const setInitStateUpdate = () => {
		setIsLoadingUpdate(false);
		setErrorUpdate(null);
		setSuccessUpdate(false);
	};

	useEffect(() => {
		if (successUpdate) {
			dispatch(
				setToast({
					severity: "success",
					summary: `${sectionName} Actualizado`,
					detail: `${sectionName} ha sido actualizado exitosamente`,
				})
			);
			if (addModal) {
				addModal.onHideModal();
			}
			setInitStateUpdate();
			if (reloadFetchData) {
				reloadFetchData();
			}
		}
	}, [successUpdate]);

	const updateFetchData = async (id, data) => {
		try {
			setIsLoadingUpdate(true);

			await axios.patch(`${url}${endPoint}/${id}`, data, { headers: { Authorization: `Bearer ${loginData}` } });

			setIsLoadingUpdate(false);
			setSuccessUpdate(true);
		} catch (error) {
			setIsLoadingUpdate(false);
			setErrorUpdate(error);
		}
	};

	return {
		updateFetchData,
		isLoadingUpdate,
	};
};
