import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "@/connections/mainApi.js";

export const useGetFetch = (endPoint) => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getFetchData = async () => {
		try {
			const resp = await axios.get(`${url}${endPoint}`,{ headers: { Authorization: `Bearer ${loginData}` } });
			const responseData = resp.data;
			setData(responseData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const reloadFetchData = async () => {
		await getFetchData();
	};

	useEffect(() => {
		getFetchData();
	}, []);

	return {
		data,
		isLoading,
		reloadFetchData,
	};
};
