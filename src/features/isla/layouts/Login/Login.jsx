import { useEffect, useState, useRef } from "react";
import style from "./Login.module.css";
import axios from "axios";
import { url } from "@/connections/mainApi";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const Login = ({ nextStep }) => {
    const [error, setError] = useState("");
    const [loginData, setLoginData] = useState({operarioDni: "",});
    const documentoRef = useRef(null);
	const [documentoFocused, setDocumentoFocused] = useState(false);
    
    useEffect(() => {
        setDocumentoFocused(true);
    }, []);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("");
            }, 7000);
        }
    }, [error]);

    const handleLogin = async () => {
        try {
            const resp = await axios.post(`${url}/auth/login-web-operario`, loginData);
            if (resp?.data.token) {
                nextStep(2);
            }
        } catch (error) {
            const respError = error.response.data.message;
            setError(respError);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className={style.login__container}>
            <h2 className={style.login__title}>Inicia sesión</h2>

            <TextBoxField
                ref={documentoRef}
                textLabel="DOCUMENTO:"
                direction="row"
                labelWidth="110px"
                name="operarioDni"
                type="number"
                value={loginData.operarioDni}
                onChange={(e) => handleChangeInput(e, setLoginData)}
                onKeyDown={handleKeyDown}
                isFocused={documentoFocused}
			    onFocusChange={() => setDocumentoFocused(false)}
            />
            {error && <p className="msg-error">{error}</p>}

            <CustomButton
                text="Siguiente"
                onClick={handleLogin}
                backgroundButton="var(--button-color)"
                colorP="#fff"
            />

            <p className={style.warning__message}>
                Si el documento no se encuentra registrado por favor, comunicate con el administrador de su estación.
            </p>
        </div>
    );
};
