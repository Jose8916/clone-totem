import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	etapa: 1,
	rechazado: false,
	dni: "",
	cod_compra: "",
	placa: "",
	detalleTransaccion: {},
};

export const islaSlice = createSlice({
	name: "isla",
	initialState,
	reducers: {
		onLoading: (state) => {
			state.loading = true;
		},
		resetState: (state) => {
			state.etapa = 1;
			state.rechazado = false;
			state.dni = "";
			state.placa = "";
			state.detalleTransaccion = {};
		},
		addEtapa: (state, action) => {
			state.etapa = action.payload;
			state.loading = false;
		},
		setDateValidate: (state, action) => {
			state.cod_compra = action.payload.codigo;
			state.placa = action.payload.placa;
		},
		clearDateValdiate: (state) => {
			state.cod_compra = "";
			state.placa = "";
		},
		declineEtapa: (state) => {
			state.rechazado = true;
		},
		setDetalleTransaccion: (state, action) => {
			state.detalleTransaccion = action.payload;
		},
		clearDetalleTransaccion: (state) => {
			state.detalleTransaccion = {};
		},
	},
});

export const {
	onLoading,
	resetState,
	addEtapa,
	declineEtapa,
	setDetalleTransaccion,
	clearDetalleTransaccion,
	setDateValidate,
	clearDateValidate,
} = islaSlice.actions;
