import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "@/App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/primereact.min.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<App />
		</Provider>
	</QueryClientProvider>
);
