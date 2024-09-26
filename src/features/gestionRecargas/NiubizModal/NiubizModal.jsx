import React from "react";
import style from "./NiubizModal.module.css";

export const NiubizModal = ({ niubizData }) => {
	return (
		<div className={style.box__section}>
			<div className={style.box__transaction}>
				<p className={style.box__label}>Id de transacción: </p>
				<p>{niubizData?.transactionId}</p>
			</div>

			<div className={style.box__transaction}>
				<p className={style.box__label}>Número de seguimiento: </p>
				<p>{niubizData?.traceNumber}</p>
			</div>

			<div className={style.box__transaction}>
				<p className={style.box__label}>Monto: </p>
				<p>
					{niubizData?.currency == "PEN" && "S/."}
					{niubizData?.amount}
				</p>
			</div>

			<div className={style.box__transaction}>
				<p className={style.box__label}>Moneda: </p>
				<p>{niubizData?.currency}</p>
			</div>

			<div className={style.box__transaction}>
				<p className={style.box__label}>Id de transacción: </p>
				<p>{niubizData?.transactionId}</p>
			</div>
		</div>
	);
};
