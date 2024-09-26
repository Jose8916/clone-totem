import React from "react";
import style from "./IslaHeader.module.css";

export const IslaHeader = () => {
	return (
		<>
			<header className={style.mainHeader__container}>
				<div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
					<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
						<p className={style.mainHeader__title}>MiTotem</p>
					</div>
				</div>
			</header>
		</>
	);
};
