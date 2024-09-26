import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function PrimeDropDown( {setTipoGasolina} ) {
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(()=>{

      if(selectedCity)
        setTipoGasolina(selectedCity.code)

    },[selectedCity])

    const cities = [
        { name: 'Regular', code: '1' },
        { name: 'G Premium', code: '2' },
    ];

    return (
      <div className="card flex justify-content-center">
        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
        placeholder="Tipo de Combustible" className="w-full md:w-14rem" />
      </div>
    )
}
    