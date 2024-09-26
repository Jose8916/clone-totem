import React from "react";
import style from "./CustomButton.module.css";

export const CustomButton = ({
	icon,
	text,
	shortcut,
	backgroundButton = "#eceff1",
	height = "auto",
	colorP = "black",
	sizeP,
	onClick,
}) => {
	const styles = {
		background: backgroundButton,
		height: height,
		color: colorP,
	};
	const stylesP = {
		color: colorP,
		fontSize: sizeP,
	};

	return (
		<div className={style.button__action} style={styles} onClick={onClick}>
			{icon}
			<p className={style.button__text} style={stylesP}>
				{text} {shortcut ? `[${shortcut}]` : null}
			</p>
		</div>
	);
};
