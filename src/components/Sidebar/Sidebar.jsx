import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";

import style from "./Sidebar.module.css";

import { appRoutesBackOffice } from "@/data/Rutas";

const Sidebar = ({ appRoutes, isSidebarOpen }) => {
	return (
		<>
			{isSidebarOpen && appRoutes && (
				<div className={style.container__drawer}>
					<List disablePadding>
						{appRoutesBackOffice.map((route, index) =>
							route.sidebarProps ? (
								route.child ? (
									<></>
								) : (
									<SidebarItem item={route} key={index} />
								)
							) : null
						)}
					</List>
				</div>
			)}
		</>
	);
};

export default Sidebar;
