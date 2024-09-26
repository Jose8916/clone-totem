import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import style from "./AppRoutes.module.css";

import Sidebar from "@/components/Sidebar/Sidebar";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { appRoutesBackOffice, specialRoute, RouteUser } from "@/data/Rutas";

import { HomePage } from "@/features/web/pages/home/HomePage";
import { LoginPage } from "@/features/login/pages/LoginPage";

import { Dashboard } from "@/features/dashboard/pages/Dashboard";
import { GestionRecargas } from "@/features/gestionRecargas/pages/GestionRecargas";

import ListaPrecios from "@/features/listaPrecios/pages/ListPrice";
import Configuration from "@/features/configuracion/pages/Configuration";

import { toggleSidebar } from "@/store/slices/sidebar/IsSidebarOpen";
import ReporteDiario from "@/features/ReporteDiario/ReporteDiario";
import ParametrosSistema from "@/features/ParametrosSistema/ParametrosSistema";
import RegisterRoot from "@/features/registerForms/registerRoot/RegisterRoot";
import RegisterAdmin from "@/features/registerForms/registerAdmin/RegisterAdmin";
import Terminos from "@/features/web/Terminos/Terminos";
import Mallita from "@/features/malla/pages/[id]/Mallita";
import GestionGrifos from "@/features/gestionGrifos/GestionGrifos";
import { Operacion } from "@/features/isla/Operacion/Operacion";
import { PrecioTotem } from "@/features/precioTotem/pages/PrecioTotem";
import { PadronOperarios } from "@/features/PadronOperarios/PadronOperarios";
import { VerificacionUsuario } from "@/features/web/VerificacionUsuario/VerificacionUsuario";

// Isla

export const AppRoutes = () => {
	const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
	const dispatch = useDispatch();

	const handleToggleSidebar = () => {
		dispatch(toggleSidebar());
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/verificacion/:token" element={<VerificacionUsuario />} />
				<Route path="/terminos-y-condiciones" element={<Terminos />} />

				{/* Backoffice */}
				<Route
					path="/admin/*"
					element={
						<AppStructure>
							<MainHeader toggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
							<div
								className={style.container__drawer}
								style={{
									display: isSidebarOpen ? "grid" : "flex",
									gridTemplateColumns: isSidebarOpen ? "320px 1fr" : "none",
									// justifyContent: isSidebarOpen ? "unset" : "center",
								}}
							>
								<Sidebar
									appRoutes={appRoutesBackOffice}
									isSidebarOpen={isSidebarOpen}
									specialRoute={specialRoute}
									RouteUser={RouteUser}
								/>

								<Routes>
									<Route path="/" element={<Dashboard />} />
									<Route path="/recargas" element={<GestionRecargas />} />

									<Route path="/lista-precios" element={<ListaPrecios />} />
									<Route path="/configuracion-servicios" element={<Configuration />} />
									<Route path="/configuracion-malla" element={<PrecioTotem />} />
									{/* <Route path="/configuracion-malla" element={<Malla />} /> */}
									<Route path="/configuracion-malla/:id" element={<Mallita />} />
									<Route path="/reporte-diario" element={<ReporteDiario />} />
									<Route path="/parametros-del-sistema" element={<ParametrosSistema />} />

									<Route path="/registrar-admin" element={<RegisterRoot />} />
									<Route path="/registrar-operador" element={<RegisterAdmin />} />
									<Route path="/gestion-grifos" element={<GestionGrifos />} />
									<Route path="/padron-operarios" element={<PadronOperarios />} />

									{/* Agrega más rutas de sub-mantenimientos aquí */}
									<Route path="/*" element={<Navigate to="/" />} />
								</Routes>
							</div>
						</AppStructure>
					}
				/>

				{/* isla */}

				<Route
					path="/isla/*"
					element={
						<Routes>
							<Route path="/operacion" element={<Operacion />} />
						</Routes>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
