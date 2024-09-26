import { SelectButton } from 'primereact/selectbutton';

export default function SelectHorario( { horarioEdit, setHorarioEdit } ) {
    const items = [
        { name: 'Cantidad de Turnos', value: 4 }
    ];
    
    return (
        <div className="card flex justify-content-center">
            <SelectButton value={horarioEdit} onChange={(e) => setHorarioEdit(e.value)} optionLabel="name" options={items} />
        </div>
    );
}