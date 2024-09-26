import style from "./MainContentStructure.module.css";
import { useSelector } from "react-redux";

export const MainContentStructure = ({ children }) => {
	const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);

	return <div className={style.mainContent__container} style={{
		maxWidth: isSidebarOpen === true && 'calc(100vw - 340px)' ,
		width: isSidebarOpen === false &&  'calc(100vw - 0px)',
	}}>{children}</div>;
};
