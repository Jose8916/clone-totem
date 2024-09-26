import style from "./DatosTransaccion.module.css";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const DatosTransaccion = ({ nextStep }) => {
    const { detalleTransaccion } = useSelector((state) => state.isla);
    const [snackState, setSnackState] = useState({ open: false, vertical: 'bottom', horizontal: 'center', message: '' });
    const { vertical, horizontal, open, message } = snackState;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setSnackState({ ...snackState, open: true, message: 'Texto copiado.' });       
        }).catch(err => {
            console.error('Error al copiar texto: ', err);
        });
    };

    const handleSnackBarClose = () => { setSnackState({ ...snackState, open: false }); };

    // Definir los datos a mostrar de manera dinámica
    const transactionData = [
        { label: 'Tipo de comprobante', copyButton: false, value: detalleTransaccion?.tipoComprobante },
        { label: 'RUC / DNI', copyButton: true, value: detalleTransaccion?.tipoComprobante === "Boleta" ? detalleTransaccion?.tipoDocumento?.dni : detalleTransaccion?.tipoDocumento?.ruc },
        { label: 'Razón social / Nombre', copyButton: true, value: detalleTransaccion?.tipoComprobante === "Boleta" ? detalleTransaccion?.nombre?.nombre : detalleTransaccion?.nombre?.razonSocial },
        { label: 'Método de pago', copyButton: false, value: detalleTransaccion?.metodoDePago },
        { label: 'Placa', copyButton: true, value: detalleTransaccion?.numeroPlaca },
        { label: 'Combustible', copyButton: false, value: detalleTransaccion?.combustible },
        { label: 'GL a despachar', copyButton: true, value: detalleTransaccion?.glDespachar },
        { label: 'Total PEN a despachar', copyButton: true, value: 'S/ '+detalleTransaccion?.montoTotalDespachar }
    ];

    return (
        <div className={style.login__container}>
            <h2 className={style.login__title}>Datos de la transacción</h2>
            <div className={style.datos__container}>
                {transactionData.map((item, index) => (
                    <div key={index} className={style.datos__item}>
                        <p className={style.datos__item__label}>{item.label}:</p>
                        <p className={style.datos__item__text}>{item.value}</p>
                        <Button
                        className={style.datos__item__button}
                        icon="pi pi-copy"
                        onClick={() => copyToClipboard(item.value)}>
                        </Button>
                    </div>
                ))}
            </div>
            <Button label="Siguiente" onClick={() => nextStep(4)} />
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleSnackBarClose}
                autoHideDuration={3000}
                TransitionComponent={Slide}
                key={vertical + horizontal}
            > 
                <Alert
                    onClose={handleSnackBarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default React.memo(DatosTransaccion);
