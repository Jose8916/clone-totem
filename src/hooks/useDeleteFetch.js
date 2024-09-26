import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/store/slices/toast/toastSlice";

export const useDeleteFetch = (endPoint, sectionName, reloadFetchData) => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const dispatch = useDispatch()
	const [isLoadingDelete, setIsLoadingDelete] = useState(true);
	const [errorDelete, setErrorDelete] = useState(null);
	const [successDelete, setSuccessDelete] = useState(false);

	const setInitStateDelete = () => {
		setIsLoadingDelete(false);
		setErrorDelete(null);
		setSuccessDelete(false);
	};

	useEffect(() => {
		if (successDelete) {
			dispatch(
				setToast({
					severity: "success",
					summary: `${sectionName} Eliminado`,
					detail: `${sectionName} ha sido eliminado exitosamente`,
				})
			);

			setInitStateDelete();
			if (reloadFetchData) {
				reloadFetchData();
			}
		}
	}, [successDelete]);

	const deleteFetchData = async (id) => {
		try {
			await axios.delete(`${url}${endPoint}/${id}`,{ headers: { Authorization: `Bearer ${loginData}` } });
			setSuccessDelete(true);
			setIsLoadingDelete(false);
		} catch (error) {
			console.error(error);
			setErrorDelete(error);
			setIsLoadingDelete(false);
		}
	};

	return {
		deleteFetchData,
		isLoadingDelete,
	};
};
