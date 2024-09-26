import React from "react";
import { Link } from "react-router-dom";

import style from "./Footer.module.css";

const Footer = () => {
	return (
		<footer>
			<div className={style.footer_acerca}>
				<Link className={style.footer_links}>Quiénes somos</Link>
				<Link to='/terminos-y-condiciones' className={style.footer_links}>Términos y condiciones</Link>
			</div>
			<div className={style.footer_acerca}>
				<Link className={style.footer_links}>Privacidad</Link>
				<Link className={style.footer_links}>conocé más sobre nuestro producto</Link>
			</div>
			<div className={style.footer_acerca}>
				<Link className={style.footer_links}>Acuerdo corporativos</Link>
			</div>
		</footer>
	);
};

export default Footer;
