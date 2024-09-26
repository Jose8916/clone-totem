import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import styled from './InputPrecio.module.css';

function InputPrecio( { malla, setMalla, turno } ) {

  const data = malla.find((item) => item.type === turno.type);

  const handleChange = (e, name) => {
    setMalla((prevData) =>
      prevData.map((item) =>
        item.type === data.type ? { ...item, [name]: e.target.value } : item
      )
    );
  };

  if (!data) {
    return <div>No se encontró el tipo de datos en la malla.</div>;
  }


  return (
    <div style={{ textAlign: 'center', marginTop: '1.5rem', display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h4>{`Turno ${turno.type}`}</h4>
      <div className={styled.container__1__inputs}>
        <div className={styled.item__field}>
          <label htmlFor=""> Rango de consumo</label>
          <div className={styled.input__field}>
            <InputText
              placeholder=" Ejemplo: 50-50"
              value={turno.range_1}
              onChange={(e) => handleChange(e, 'range_1')}
              plac
            />
          </div>
        </div>
        <div className={styled.item__field}>
          <label htmlFor=""> Rango de consumo 2</label>
          <div className={styled.input__field}>
            <InputText
              placeholder="Ejemplo: 50-50"
              value={turno.range_2}
              onChange={(e) => handleChange(e, 'range_2')}
            />
          </div>
        </div>
        <div className={styled.item__field}>
          <label htmlFor=""> Rango de consumo 3</label>
          <div className={styled.input__field}>
            <InputText
              placeholder=" Ejemplo: 50-50"
              value={turno.range_3}
              onChange={(e) => handleChange(e, 'range_3')}
            />
          </div>
        </div>
      </div>

      <div className={styled.container__2__inputs}>
        <div className={styled.item__field}>
          <label htmlFor=""> Precio Especial</label>
          <div className={styled.input__field}>
            <InputNumber
              value={turno.price_1}
              onValueChange={(e) => handleChange(e, 'price_1')}
              prefix="S / "
              suffix=" X Gal"
              placeholder="Define tu precio en Soles"
            />
          </div>
        </div>
        <div className={styled.item__field}>
          <label htmlFor=""> Precio Especial 2</label>
          <div className={styled.input__field}>
            <InputNumber
              value={turno.price_2}
              onValueChange={(e) => handleChange(e, 'price_2')}
              placeholder="Define tu precio en Soles"
              prefix="S / "
              suffix=" X Gal"
            />
          </div>
        </div>
        <div className={styled.item__field}>
          <label htmlFor=""> Precio Especial 3</label>
          <div className={styled.input__field}>
            <InputNumber
              value={turno.price_3}
              onValueChange={(e) => handleChange(e, 'price_3')}
              prefix="S / "
              suffix=" X Gal"
              placeholder="Define tu precio en Soles"

            />
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default InputPrecio;
