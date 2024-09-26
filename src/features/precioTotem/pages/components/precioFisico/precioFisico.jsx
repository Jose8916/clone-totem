import style from "./precioFisico.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { FaCheck } from "react-icons/fa";

export function PrecioFisico({ handleChange, fuels, buttonController, onUpdateFuels }) {
	return (
		<>
			<div className={style.container}>
				<div className={style.container__main}>
					<p className={style.tipoGasolina__text}>PREMIUM:</p>
					<div className={style.containe__1}>
						<p> S/.</p>
						<TextBoxField
							name={"pricePremium"}
							onChange={handleChange}
							value={fuels?.pricePremium || ""}
							direction="row"
							type="number"
						/>
						<p> /gal</p>
					</div>
				</div>
				<div className={style.container__main}>
					<p className={style.tipoGasolina__text}>REGULAR:</p>
					<div className={style.containe__1}>
						<p> S/.</p>
						<TextBoxField
							name={"priceRegular"}
							onChange={handleChange}
							value={fuels?.priceRegular || ""}
							direction="row"
							type="number"
						/>
						<p> /gal</p>
					</div>
				</div>
				<div className={style.container__main}>
					<p className={style.tipoGasolina__text}>DIESEL:</p>
					<div className={style.containe__1}>
						<p> S/.</p>
						<TextBoxField
							name={"priceDiesel"}
							onChange={handleChange}
							value={fuels?.priceDiesel || ""}
							direction="row"
							type="number"
						/>
						<p> /gal</p>
					</div>
				</div>
				<div className={style.container__main}>
					<p className={style.tipoGasolina__text}>GLP:</p>
					<div className={style.containe__1}>
						<p> S/.</p>
						<TextBoxField
							name={"priceGLP"}
							onChange={handleChange}
							value={fuels?.priceGLP || ""}
							direction="row"
							type="number"
						/>
						<p> /gal</p>
					</div>
				</div>
				<div className={style.container__main}>
					<p className={style.tipoGasolina__text}>GNV:</p>
					<div className={style.containe__1}>
						<p> S/.</p>
						<TextBoxField
							name={"priceGNV"}
							onChange={handleChange}
							value={fuels?.priceGNV || ""}
							direction="row"
							type="number"
						/>
						<p> /gal</p>
					</div>
				</div>
			</div>

			{buttonController && (
				<div className={style.container__button}>
					<div className={style.button} onClick={onUpdateFuels}>
						<FaCheck /> Aceptar Cambios
					</div>
				</div>
			)}
		</>
	);
}
