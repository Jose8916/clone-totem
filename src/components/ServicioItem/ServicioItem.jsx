import { PrimeSelection } from "@/primeComponents/PrimeSelection/PrimeSelection";
import { TextBoxField } from "../TextBoxField/TextBoxField";

import { FaCheck } from "react-icons/fa";

import styled from "./ServicioItem.module.css";

function ServicioItem({ labels, services, setServices }) {

	const handleChange = (event, serviceName, isCheckbox) => {
		if (isCheckbox) {
			const optionIndex = event.target.dataset.optionIndex;
			setServices((prevServices) => {
				const updatedServices = prevServices.map((service) => {
					if (service.name === serviceName) {
						const updatedOptions = service.options.map((option, index) => {
							if (index === parseInt(optionIndex)) {
								return {
									...option,
									isChecked: event.target.checked,
								};
							}
							return option;
						});

						return {
							...service,
							options: updatedOptions,
						};
					}
					return service;
				});

				return updatedServices;
			});
		} else {
			const value = event.target.value;
			setServices((prevServices) => {
				const updatedServices = prevServices.map((service) => {
					if (service.name === serviceName) {
						return {
							...service,
							area: value, // Actualizar el valor del área con el valor del input
						};
					}
					return service;
				});

				return updatedServices;
			});
		}
	};

	const handleValueChange = (selectedValue, serviceName) => {
		const newRating = selectedValue === labels[0] ? 1 : 0;
		setServices((prevServices) => {
			const updatedServices = prevServices.map((service) => {
				if (service.name === serviceName) {
					return {
						...service,
						// service: {
						// 	...service,
						// 	status: selectedValue === labels[0],
						// 	rating: newRating,
						// },
					};
				}
				return service;
			});

			// Actualizamos la calificación de todos los servicios activos
			return updatedServices.map((service) => {
				if (service.status) {
					return {
						...service,
						// service: {
						// 	...service,
						// 	rating: newRating,
						// },
					};
				}
				return service;
			});
		});
	};

	return (
		<>
			{services &&
				services.map((service) => (
					<PrimeSelection
						idKey={service.id}
						key={service.id}
						labels={labels}
						textLabel={service.name}
						value={service.status ? labels[0] : labels[1]}
						iconComponent={<FaCheck />}
						showEditButton={service.status}
						setServices={setServices}
						services={services}
						onValueChange={(selectedValue) => handleValueChange(selectedValue, service.name)}
						additionalElement={
							<>
								{service.name == "Servicio Gratuitos" ? (
									<div className={styled.div_1}>
										<div className={styled.div_2}>
											{service.options?.slice(0, 2).map((option, index) => (
												<div className={styled.div_3} key={index}>
													<input
														type="checkbox"
														data-option-index={index}
														checked={option.isChecked ? true : null}
														onChange={(e) => handleChange(e, service.name, true)}
														style={{ cursor: "pointer" }}
													/>
													<label style={{ flex: 1 }}> {option.label} </label>
												</div>
											))}
										</div>

										<div className={styled.div_4}>
											{service.options?.slice(2, 4).map((option, index) => (
												<div className={styled.div_3} key={index}>
													<input
														type="checkbox"
														data-option-index={index + 2}
														checked={option.isChecked}
														onChange={(e) => handleChange(e, service.name, true)}
														style={{ cursor: "pointer" }}
													/>
													<label style={{ flex: 1 }}>{option.label}</label>
												</div>
											))}
										</div>
									</div>
								) : service.name === "Servicio de Cajeros" ? (
									<div className={styled.div_5}>
										<div className={styled.div_6}>
											{service.options?.slice(0, 2).map((option, index) => (
												<div className={styled.div_3} key={index}>
													<input
														type="checkbox"
														data-option-index={index}
														checked={option.isChecked}
														onChange={(e) => handleChange(e, service.name, true)}
														style={{ cursor: "pointer" }}
													/>
													<label style={{ flex: 1 }}>{option.label}</label>
												</div>
											))}
										</div>
										<div className={styled.div_6}>
											{service.options?.slice(2, 4).map((option, index) => (
												<div key={index} className={styled.div_3}>
													<input
														type="checkbox"
														data-option-index={index + 2}
														checked={option.isChecked}
														onChange={(e) => handleChange(e, service.name, true)}
														style={{ cursor: "pointer" }}
													/>
													<label style={{ flex: 1 }}>{option.label}</label>
												</div>
											))}
										</div>
										<div className={styled.div_6}>
											{service.options?.slice(4, 6).map((option, index) => (
												<div key={index} className={styled.div_3}>
													<input
														type="checkbox"
														data-option-index={index + 4}
														checked={option.isChecked}
														onChange={(e) => handleChange(e, service.name, true)}
														style={{ cursor: "pointer" }}
													/>
													<label style={{ flex: 1 }}>{option.label}</label>
												</div>
											))}
										</div>
									</div>
								) : (
									<div className={styled.container__input}>
										<TextBoxField
											value={service.area}
											onChange={(e) => handleChange(e, service.name, false)}
											placeholder={"Área en mt2"}
										/>
										<p> m2</p>
									</div>
								)}
							</>
						}
					/>
				))}
		</>
	);
}

export default ServicioItem;
