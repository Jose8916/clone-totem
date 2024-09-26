import React from "react";
import style from "./Login.module.css";
import ContenedorLogin from "../components/ContenedorLogin";

export const LoginPage = () => {
	return (
		<div className={style.container}>
			<ContenedorLogin />
		</div>
	);
};
