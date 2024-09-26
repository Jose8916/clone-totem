import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import sidebarReducer from "./slices/sidebar/IsSidebarOpen";
import { dataServicesSlice } from "./slices/servicesData/ServicesSlice";
import { dataMallaSlice } from "./slices/mallaData/MallaSlice"; //
import { islaSlice } from "./slices/isla";
import { toastSlice } from "./slices/toast/toastSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		sidebar: sidebarReducer,
		dataServices: dataServicesSlice.reducer,
		dataMalla: dataMallaSlice.reducer,
		isla: islaSlice.reducer,
		toast: toastSlice.reducer
	},
});
