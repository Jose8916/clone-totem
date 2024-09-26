import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/store/slices/toast/toastSlice";

export const usePostFetch = (endPoint, sectionName, reloadFetchData, addModal) => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoadingPost, setIsLoadingPost] = useState(false);
	const [errorPost, setErrorPost] = useState(null);
	const [successPost, setSuccessPost] = useState(false);

	const setInitStatePost = () => {
		setIsLoadingPost(false);
		setErrorPost(null);
		setSuccessPost(false);
	};

	useEffect(() => {
		if (successPost) {
			dispatch(
				setToast({
					severity: "success",
					summary: `${sectionName} `,
					detail: `Se ha realizado la operación exitosamente`,
				})
			);
			if (addModal) {
				addModal.onHideModal();
			}
			setInitStatePost();
			if (reloadFetchData) {
				reloadFetchData();
			}
		}
	}, [successPost]);

	const postFetchData = async (data, query, pathUrl) => {
		try {
			setIsLoadingPost(true);

			const resp = await axios.post(`${url}${endPoint}${query ? `?${query}` : ""}`, data, { headers: { Authorization: `Bearer ${loginData}` } })
				.catch(error => { 
					setSuccessPost(false);
					console.log("error:", error.response.data.message)
					dispatch(
						setToast({
							severity: "error",
							summary: `${sectionName} `,
							detail: error.response.data.message,
						})
					);
					throw error.response.data;
				});

			setIsLoadingPost(false);
			setSuccessPost(true);

			if (pathUrl) {
				setTimeout(() => {
					navigate(pathUrl);
				}, 500);
			}

			let responseData = null;
			if(resp?.data.data){ responseData = resp.data.data;
			}else if(resp) { responseData = resp.data;
			}else { responseData = resp; }

			return responseData;
		} catch (error) {
			setIsLoadingPost(false);
			setErrorPost(error);
			return error;
		}
	};

	return {
		postFetchData,
		isLoadingPost,
		errorPost,
	};
};
