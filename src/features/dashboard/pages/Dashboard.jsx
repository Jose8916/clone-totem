import style from "./Dashboard.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { FaCheck, FaFlag } from "react-icons/fa";

import { FaRegHourglass, FaChartBar } from "react-icons/fa";
import { useGetFetch } from "@/hooks/useGetFetch";

export const Dashboard = () => {
	const { data } = useGetFetch("/transaccion/back-office/dashboardDiario");

	return (
		<MainContentStructure>
			<h2 className="title__sections">Dashboard Diario</h2>
			<hr />

			<div className={style.main__content}>
				<div className={style.section__dashboard__container}>
					<div className={style.section_structure}>
						<div className={style.dashboard_resume_data}>
							<h3>
								Meta diaria <FaFlag sx={style.icon__style} />
							</h3>

							<div className={style.div__1}>
								<div className={style.div__2}>
									<div className={style.container__item}>
										<p className={style.p__1}> Soles </p>
										<p> {data?.metaDiaria?.soles || "0"} </p>
									</div>

									<div className={style.separator}> </div>

									<div className={style.container__item}>
										<p className={style.p__1}> GAL </p>
										<p> {data?.metaDiaria?.gal || "0"} </p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={style.section_structure}>
						<div className={style.dashboard_resume_data}>
							<h3>
								Transacciones finalizadas <FaCheck sx={style.icon__style} />
							</h3>

							<div className={style.div__1}>
								<div className={style.div__2}>
									<div className={style.container__item}>
										<p className={style.p__1}> Soles </p>
										<p> {data?.transaccionesExitosas?.soles || "0"} </p>
									</div>

									<div className={style.separator}> </div>

									<div className={style.container__item}>
										<p className={style.p__1}> GAL </p>
										<p> {data?.transaccionesExitosas?.gal || "0"} </p>
									</div>

									<div className={style.separator}> </div>

									<div className={style.container__item}>
										<p className={style.p__1}> Transacciones </p>
										<p> {data?.transaccionesExitosas?.transaccion || "0"} </p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={style.section__dashboard__container}>
					<div className={style.section_structure}>
						<div className={style.dashboard_resume_data}>
							<h3>
								Transacciones pendientes <FaRegHourglass sx={style.icon__style} />
							</h3>

							<div className={style.div__1}>
								<div className={style.div__2}>
									<div className={style.container__item}>
										<p className={style.p__1}> Soles </p>
										<p> {data?.transaccionesPendientes?.soles || "0"} </p>
									</div>

									<div className={style.separator}> </div>

									<div className={style.container__item}>
										<p className={style.p__1}> GAL </p>
										<p> {data?.transaccionesPendientes?.gal || "0"} </p>
									</div>

									<div className={style.separator}> </div>

									<div className={style.container__item}>
										<p className={style.p__1}> Transacciones </p>
										<p> {data?.transaccionesPendientes?.transaccion || "0"} </p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={style.section_structure}>
						<div className={style.dashboard_resume_data}>
							<h3>
								Intenciones de compra <FaChartBar sx={style.icon__style} />
							</h3>
							<div className={style.div__1}>
								<div className={style.div__2}>
									<div className={style.container__item}>
										<p className={style.p__1}> Totales </p>
										<p> {data?.intencionesCompra?.totales || "0"} </p>
									</div>

									<div className={style.separator}> </div>

									<div className={style.container__item}>
										<p className={style.p__1}> Ganadas </p>
										<p> {data?.intencionesCompra?.ganadas || "0"} </p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainContentStructure>
	);
};
