import React, { useEffect, useRef } from "react";
import { AppRoutes } from "@/routes/AppRoutes";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";

export const App = () => {
	// Toast
	const toast = useRef(null);

	const { toastConfig } = useSelector((state) => state.toast);

	useEffect(() => {
		if (toastConfig.severity) {
			toast.current?.show({
				severity: toastConfig.severity,
				summary: toastConfig.summary,
				detail: toastConfig.detail,
			});

			// dispatch(clearToast());
		}
	}, [toastConfig]);
	return (
		<>
			<Toast ref={toast} />
			<AppRoutes />
		</>
	);
};
