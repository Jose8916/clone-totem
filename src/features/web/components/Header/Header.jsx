import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
	return (
		<header className={style.header_contenedor}>
			<div className={style.header_mitotem}>
				<div className={style.header_mitotem_contenedor}>
					<img
						className={style.header_mitotem_img}
						src="https://99designs-start-attachments.imgix.net/alchemy-pictures/2015%2F12%2F03%2F22%2F13%2F11%2F859f9315-8041-4ae0-a79d-ab1f7973caf2%2Fpinterest-logo.png?auto=format&ch=Width%2CDPR&crop=false&fm=png"
						alt=""
					/>
				</div>
				<div className={style.header_mitotem_contenedor}>
					<h2 className={style.header_mitotem_title}>mitotem</h2>
				</div>
			</div>

			<div className={style.header_ingresar}>
				<Link to="/login" className={style.header_ingresar_button}>
					Ingresar backoffice
				</Link>

				<Link to="/isla/operacion" className={style.header_ingresar_button}>
					Ingresar isla
				</Link>
			</div>
		</header>
	);
};

export default Header;
