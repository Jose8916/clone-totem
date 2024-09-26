import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi";
import { useParams } from "react-router-dom";
import style from "./VerificacionUsuario.module.css";
import Footer from "@/features/web/components/Footer/Footer";

export const VerificacionUsuario = () => {
	const { token } = useParams();
	const [verificationStatus, setVerificationStatus] = useState(null);

	useEffect(() => {
		verifyUser();
	}, [token]);

	const verifyUser = async () => {
		if (token) {
			try {
				await axios.get(`${url}/users/activar-user/${token}`)
					.then(response => {
						if (response.status=='200') {
							setVerificationStatus(true);
						} else {
							setVerificationStatus(false);
						}
					})
					.catch(error => {
						setVerificationStatus(false);
					});
			} catch (error) {
				setVerificationStatus(false);
			}
		}
	};

	return (
		<>
			<section className={style.home_main}>
				<div className={style.home_main_container}>
					<div className={style.home__main__container__shadow}></div>
					{verificationStatus === true ? (
						<h1 className={style.home_about_h1} style={{ textAlign: "center" }}>
							HEMOS VERIFICADO TU USUARIO
							<br />
							¡GRACIAS POR REGISTRARTE!
						</h1>
					) : verificationStatus === false ? (
						<h1 className={style.home_about_h1} style={{ textAlign: "center" }}>
							EL TOKEN HA EXPIRADO, &nbsp;SI TIENES DIFICULTADES PARA INGRESAR,
							<br />
							POR FAVOR COMUNICATE CON UN ADMINISTRADOR
						</h1>
					) : null}
				</div>
			</section>
			<Footer />
		</>
	);
};
