export const appRoutesBackOffice = [
	{
		path: "/admin/",
		sidebarProps: {
			displayText: "Dashboard Diario",
		},
		allowedRoles: ["admin", "operator"],
	},
	{
		path: "/admin/configuracion-malla",
		sidebarProps: {
			displayText: "Precios MiTotem",
		},
		allowedRoles: ["admin", "operator"],
	},
	{
		path: "/admin/recargas",
		sidebarProps: {
			displayText: "Historial de transacciones",
		},
		allowedRoles: ["admin", "operator"],
	},
	{
		path: "/admin/configuracion-servicios",
		sidebarProps: {
			displayText: "Configuracion tu estación",
		},
		allowedRoles: ["admin", "operator"],
	},
	{
		path: "/admin/lista-precios",
		sidebarProps: {
			displayText: "Lista de precios - Competencia",
		},
		allowedRoles: ["admin"],
	},
	{
		path: "/admin/padron-operarios",
		sidebarProps: {
			displayText: "Padrón de operarios",
		},
		allowedRoles: ["admin"],
	},
	{
		path: "/admin/reporte-diario",
		sidebarProps: {
			displayText: "Reporte diario",
		},
		allowedRoles: ["admin"],
	},
	{
		path: "/admin/parametros-del-sistema",
		sidebarProps: {
			displayText: "Parametros del sistema",
		},
		allowedRoles: ["admin"],
	},
];

export const specialRoute = [
	{
		path: "/admin/registrar-operador",
		sidebarProps: {
			displayText: "Registrar estación",
		},
		allowedRoles: ["root"],
	},
	{
		path: "/admin/gestion-grifos",
		sidebarProps: {
			displayText: "Grifos Registrados",
		},
		allowedRoles: ["root"],
	},
];

export const RouteUser = [
	{
		path: "/admin/configuracion-servicios",
		sidebarProps: {
			displayText: "Configuracion Servicios",
		},
		allowedRoles: ["admin", "operator"],
	},
];
