import style from "./ListPrice.module.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { DataTable } from "@/components/DataTable/DataTable";
import { url } from "@/connections/mainApi";

const ListPrice = () => {
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [data, setData] = useState([]);
	const [selectedDistrito, setSelectedDistrito] = useState('');
	const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('');
	const filterDistritoData = [
		{ name: "San Juan", code: "San Juan" },
		{ name: "Villa Maria", code: "Villa Maria" },
		{ name: "Chorrillos", code: "CHORRILLOS" }
	];
	const filterEstablecimientoData = [
		{ name: "Grifo AVA", code: "*Grifo AVA" },
		{ name: "Grifo PETROPERÚ", code: "*Grifo PETROPERÚ" }
	];

	useEffect(() => {
		getPricesData();
	}, []);

	useEffect(() => {
		getPricesData();
	}, [selectedDistrito, selectedEstablecimiento]);

	const getPricesData = async () => {
		try {
			let config = {
				params: {
					district: selectedDistrito.code,
					facility: selectedEstablecimiento.code,
				},
				headers: { Authorization: `Bearer ${loginData}` }
			};
			const response = await axios.get(`${url}/price-list-competition-direct`, config);
			if(response.data.length>0){
				setData(response.data);
			}else{
				setData('');
			}
		} catch (error) {
			throw new Error("Error al cargar los datos.");
		}
	};

	const handleClearFilters = () => {
		setSelectedDistrito('');
        setSelectedEstablecimiento('');
    };

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Precio competencia - Facilito</h2>
				<hr />
				<SectionStructure className={style.filtersContainer}>
					<div className={style.selectContainer}>
						<label className={style.labelStyle} htmlFor="fuelId">Distrito:</label>
						<Dropdown
							className={style.selectItem}
                            id="filterDistrito"
                            onChange={(e) => setSelectedDistrito(e.value)}
                            options={filterDistritoData}
                            optionLabel="name"
                            placeholder="Distrito"
                            value={selectedDistrito}
						/>
					</div>
					<div className={style.selectContainer}>
						<label className={style.labelStyle} htmlFor="transactionStatus">Establecimiento:</label>
						<Dropdown
							className={style.selectItem}
                            id="filterEstablecimiento"
                            onChange={(e) => setSelectedEstablecimiento(e.value)}
                            options={filterEstablecimientoData}
                            optionLabel="name"
                            placeholder="Establecimiento"
                            value={selectedEstablecimiento}
						/>
					</div>
					<div className={style.selectContainer}>
						<label className={style.labelStyle}>{'\u00A0'}</label>
						<Button
							icon="pi pi-times"
							onClick={handleClearFilters}
							className="p-button-danger"
							label=""
						/>
					</div>
				</SectionStructure>
				<DataTable
					columns={columns}
					data={data}
					onUpdate={true}
					onDelete={false}
					isHeaderActive={true}
				/>
			</MainContentStructure>
		</>
	);
};

export default ListPrice;

const columns = [
	{ nombre: "Distrito", campo: "distrito" },
	{ nombre: "Establecimiento", campo: "establecimiento" },
	{ nombre: "Precio Premium", campo: "precioPremium" },
	{ nombre: "Precio Regular", campo: "precioRegular" },
	{ nombre: "Precio Diesel", campo: "precioDiesel" },
	{ nombre: "Precio GLP", campo: "precioGLP" },
	{ nombre: "Precio GNV", campo: "precioGNV" },
];
