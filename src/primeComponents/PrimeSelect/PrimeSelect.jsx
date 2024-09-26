import { SelectButton } from 'primereact/selectbutton';

export default function PrimeSelect( { setValueSelect, valueSelect } ) {

    const items = [
        { name: 'Turno 1', value: 1 },
        { name: 'Turno 2', value: 2 },
        { name: 'Turno 3', value: 3 }
    ];
    
    return (
        <div className="card flex justify-content-center">
            <SelectButton value={valueSelect} onChange={(e) => setValueSelect(e.value)} optionLabel="name" options={items}  />
        </div>
    );
}
        