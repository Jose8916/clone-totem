import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoLogOutOutline } from "react-icons/io5";

import { IoPerson } from "react-icons/io5";

import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";

import style from "./MainHeader.module.css";
import { logout } from "@/store/slices/auth/authSlice";
import { useSelector } from "react-redux";

export const MainHeader = ({ title = "", actionButton = false, toggleSidebar, isSidebarOpen }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useRef(null);
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [menuActive, setMenuActive] = useState(false);

	const handleNavigate = (path) => {
		navigate(`/${path}`);
		setMenuActive(false);
	};

	const handleLogout = () => {
		dispatch(logout()); // Llama a la acción logout para cerrar la sesión utilizando Redux
		navigate("/login");
	};

	function generarFecha() {
		const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
		const meses = [
			"enero",
			"febrero",
			"marzo",
			"abril",
			"mayo",
			"junio",
			"julio",
			"agosto",
			"septiembre",
			"octubre",
			"noviembre",
			"diciembre",
		];

		// Obtener la fecha actual
		const ahora = new Date();

		// Construir la fecha en el formato deseado
		const diaSemana = dias[ahora.getDay()];
		const diaMes = ahora.getDate();
		const mes = meses[ahora.getMonth()];
		const año = ahora.getFullYear();

		return `${diaSemana} ${diaMes} de ${mes} del ${año}`;
	}

	const fechaActual = generarFecha();

	return (
		<>
			<Toast ref={toast} />
			<header className={style.mainHeader__container}>
				<div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
					<i
						style={{ cursor: "pointer", fontSize: "1.1rem" }}
						className={`pi pi-bars`}
						onClick={toggleSidebar}
					/>
					<div className={style.name__backoffice}>
						<p className={style.mainHeader__title}>BACKOFFICE</p>
						{/* {data?.map((data) => (
						<p key={data._id} className={style.name__station}>{`${data.name}`}</p>
					))} */}
					</div>
				</div>

				<div className={style.mainHeader__navbar__container}>
					<h4 className={style.current__date}> {fechaActual} </h4>
					<div style={{ position: "relative" }}>
						<div
							className={style.mainHeader__profile}
							onClick={() => setMenuActive((prev) => !prev)}
						>
							<IoPerson />
						</div>
						{menuActive && (
							<div className={style.profileMenu}>
								<ul className={style.profileMenu__list}>
									<li className={style.profileMenu__item} onClick={handleLogout}>
										<IoLogOutOutline size={20} /> Cerrar Sesión
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</header>
		</>
	);
};
