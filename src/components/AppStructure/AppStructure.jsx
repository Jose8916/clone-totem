import React from "react";

import style from "./AppStructure.module.css";

export const AppStructure = ({ children }) => {
	return <div className={style.appStructure__mainContent}>{children}</div>;
};
