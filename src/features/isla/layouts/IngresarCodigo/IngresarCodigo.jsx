import React, { useEffect, useState, useRef} from "react";
import style from "./IngresarCodigo.module.css";
import axios from "axios";
import useModal from "@/hooks/useModal";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { url } from "@/connections/mainApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDateValidate, setDetalleTransaccion } from "@/store/slices/isla/islaSlice";

const IngresarCodigo = ({ nextStep }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { modalStatus, onHideModal, onVisibleModal } = useModal();
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [placa, setPlaca] = useState({ placa: "" });
	const [disablePlaca, setDisablePlaca] = useState(false);
	const [disableCodigo, setDisableCodigo] = useState(true);
	const [errorPlaca, setErrorPlaca] = useState("");
	const [codigo, setCodigo] = useState({ codigo: "" });
	const [errorCodigo, setErrorCodigo] = useState("");
	const [operacionCorrecta, setOperacionCorrecta] = useState(false);
	const [isReplace, setIsReplace] = useState(false);
	const codigoRef = useRef(null);
	const placaRef = useRef(null);
	const [codigoFocused, setCodigoFocused] = useState(false);
	const [placaFocused, setPlacaFocused] = useState(false);

	useEffect(() => {
        setPlacaFocused(true);
    }, []);

	const verificarPlaca = async () => {
		try {
			const myData = { placa: placa.placa.trim().toUpperCase() };
			const resp = await axios.post(`${url}/transaccion/isla/placa`, myData, { headers: { Authorization: `Bearer ${loginData}` } });
			if (resp.status === 201) {
				setDisableCodigo(false);
				setErrorPlaca("");
				setDisablePlaca(true);
				setCodigoFocused(true);
			}
		} catch (error) {
			const respError = error.response.data.message;
			setErrorPlaca('No se encontraron códigos vigentes para esta placa.');
			(respError);
		}
	};

	useEffect(() => {
		if (isReplace === true) {
			setDisableCodigo(false);
			setErrorPlaca("");
			setDisablePlaca(true);
		}
	}, [isReplace]);

	const actualizarPlaca = (text) => {
		setPlaca({ placa: text });
		onHideModal();
	};

	const verificarCompra = async () => {
		const compra = {
			placa: placa.placa.trim().toUpperCase(),
			codigo: codigo.codigo.trim().toUpperCase(),
		};
		try {
			const resp = await axios.post(`${url}/transaccion/isla/validar-compra${isReplace ? "?replace=true" : ""}`, compra, { headers: { Authorization: `Bearer ${loginData}` } });
			if (resp.status === 201) {
				dispatch(setDetalleTransaccion(resp.data));
				setDisableCodigo(false);
				setErrorCodigo("");
				setOperacionCorrecta(true);
				dispatch(setDateValidate(compra));
			}
		} catch (error) {
			const respError = error.response.data.message;
			setErrorCodigo(respError);
		}
	};

	const refreshInitState = () => {
		setPlaca({ placa: "" });
		setDisablePlaca(false);
		setDisableCodigo(true);
		setErrorPlaca("");
		setCodigo({ codigo: "" });
		setErrorCodigo("");
		setOperacionCorrecta(false);
	};

	useEffect(() => {
		if (operacionCorrecta) {
			refreshInitState();
			nextStep(3);
		}
	}, [operacionCorrecta]);

	const volverInicio = () => {
		refreshInitState();
		nextStep(1);
	};

	const handleKeyPlaca = (e) => {
        if (e.key === 'Enter') {
            verificarPlaca();
        }
    };

	const handleKeyCompra = (e) => {
        if (e.key === 'Enter') {
            verificarCompra();
        }
    };

	return (
		<>
			<div className={style.login__container}>
				<h2 className={style.login__title}>Bienvenido a MiTotem</h2>

				<TextBoxField
					ref={placaRef}
					textLabel="Placa:"
					direction="row"
					labelWidth="140px"
					name="placa"
					value={placa.placa}
					onChange={(e) => handleChangeInput(e, setPlaca)}
					disabled={disablePlaca}
					errorText={errorPlaca}
					onKeyDown={handleKeyPlaca}
					isFocused={placaFocused}
					onFocusChange={() => setPlacaFocused(false)}
				/>

				<TextBoxField
					textLabel="Código de compra:"
					ref={codigoRef}
					direction="row"
					labelWidth="140px"
					name="codigo"
					value={codigo.codigo}
					onChange={(e) => handleChangeInput(e, setCodigo)}
					disabled={disableCodigo}
					errorText={errorCodigo}
					onKeyDown={handleKeyCompra}
					isFocused={codigoFocused}
					onFocusChange={() => setCodigoFocused(false)}
				/>

				{disableCodigo === true ? (
					<div className={style.buttons__container}>
						<CustomButton
							text="Verificar placa"
							onClick={() => verificarPlaca()}
							backgroundButton="var(--button-color)"
							colorP="#fff"
						/>
						<CustomButton
							text="Ingresa la placa correcta"
							onClick={() => onVisibleModal()}
							backgroundButton="var(--button-color-warning)"
							colorP="#fff"
						/>
					</div>
				) : (
					<div className={style.buttons__container}>
						<CustomButton
							text="Confirmar compra"
							onClick={() => verificarCompra()}
							backgroundButton="var(--button-color)"
							colorP="#fff"
						/>
						<CustomButton
							text="Volver"
							onClick={() => volverInicio()}
							backgroundButton="var(--button-color-warning)"
							colorP="#fff"
						/>
					</div>
				)}
			</div>

			<PrimeModal
				header="Cambiar placa correcta"
				modalStatus={modalStatus}
				onHideModal={onHideModal}
			>
				<AddModal postFetchData={actualizarPlaca} setIsReplace={setIsReplace} />
			</PrimeModal>
		</>
	);
};

export default React.memo(IngresarCodigo);
