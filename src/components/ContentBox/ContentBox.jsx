import React from "react";
import style from "./ContentBox.module.css";

export const ContentBox = ({ children, backgroundActive = false, additionalClassName = "" }) => {
	const combinedClassNames = `${style.contentBox__container} ${
		backgroundActive && style.backgroundActive
	} ${additionalClassName}`;

	return <div className={combinedClassNames}>{children}</div>;
};
