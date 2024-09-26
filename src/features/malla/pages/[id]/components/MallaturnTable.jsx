import React from "react";
import style from "../../Malla.module.css";
const MallaturnTable = ({ malla }) => {
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <>
      {malla?.items?.length === 1 && (
        <div
          className={style.tabla}
          style={{
            gridTemplateColumns: malla?.items?.length === 1 && ".5fr 1fr ",
          }}
        >
          <div className={style.encabezado}></div>
          <div className={style.encabezado}>
            <p>Turno 1</p>
            <span>{`${formatTime(malla.items[0].start_date)} - ${formatTime(malla.items[0].end_date)}`}</span>
          </div>

          <div className={`${style.fila} ${style.roja}`}>Precio 1</div>
          <div className={style.fila}> S/ {malla.items[0].price_1} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 1</div>
          <div className={style.fila}> {malla?.items[0].range_1}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 2</div>
          <div className={style.fila}> S/ {malla.items[0].price_2} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 2</div>
          <div className={style.fila}>{malla?.items[0].range_1}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 3</div>
          <div className={style.fila}> S/ {malla.items[0].price_3} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 3</div>
          <div className={style.fila}>{malla?.items[0].range_1}</div>
        </div>
      )}
      {malla?.items?.length === 2 && (
        <div
          className={style.tabla}
          style={{
            gridTemplateColumns: malla?.items?.length === 2 && ".5fr 1fr 1fr ",
          }}
        >
          <div className={style.encabezado}></div>
          <div className={style.encabezado}>
            <p>Turno 1</p>
            <span>{`${formatTime(malla.items[0].start_date)} - ${formatTime(malla.items[0].end_date)}`}</span>
          </div>
          <div className={style.encabezado}>
            <p>Turno 2</p>
            <span>{`${formatTime(malla.items[1].start_date)} - ${formatTime(malla.items[1].end_date)}`}</span>
          </div>

          <div className={`${style.fila} ${style.roja}`}>Precio 1</div>
          <div className={style.fila}> S/ {malla.items[0].price_1} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_1} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 1</div>
          <div className={style.fila}>{malla?.items[0].range_1}</div>
          <div className={style.fila}>{malla?.items[1].range_1}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 2</div>
          <div className={style.fila}> S/ {malla.items[0].price_2} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_2} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 2</div>
          <div className={style.fila}>{malla?.items[0].range_2}</div>
          <div className={style.fila}>{malla?.items[1].range_2}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 3</div>
          <div className={style.fila}> S/ {malla.items[0].price_3} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_3} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 3</div>
          <div className={style.fila}>{malla?.items[0].range_3}</div>
          <div className={style.fila}>{malla?.items[1].range_3}</div>
        </div>
      )}

      {malla?.items?.length === 3 && (
        <div
          className={style.tabla}
          style={{
            gridTemplateColumns: malla?.items?.length === 3 && ".5fr 1fr 1fr 1fr",
          }}
        >
          <div className={style.encabezado}></div>
          <div className={style.encabezado}>
            <p>Turno 1</p>
            <span>{`${formatTime(malla.items[0].start_date)} - ${formatTime(malla.items[0].end_date)}`}</span>
          </div>
          <div className={style.encabezado}>
            <p>Turno 2</p>
            <span>{`${formatTime(malla.items[1].start_date)} - ${formatTime(malla.items[1].end_date)}`}</span>
          </div>

          <div className={style.encabezado}>
            <p>Turno 3</p>
            <span>{`${formatTime(malla.items[2].start_date)} - ${formatTime(malla.items[2].end_date)}`}</span>
          </div>

          <div className={`${style.fila} ${style.roja}`}>Precio 1</div>
          <div className={style.fila}> S/ {malla.items[0].price_1} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_1} x Gal</div>
          <div className={style.fila}> S/ {malla.items[2].price_1} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 1</div>
          <div className={style.fila}>{malla?.items[0].range_1}</div>
          <div className={style.fila}>{malla?.items[1].range_1}</div>
          <div className={style.fila}>{malla?.items[2].range_1}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 2</div>
          <div className={style.fila}> S/ {malla.items[0].price_2} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_2} x Gal</div>
          <div className={style.fila}> S/ {malla.items[2].price_2} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 2</div>
          <div className={style.fila}>{malla?.items[0].range_2}</div>
          <div className={style.fila}>{malla?.items[1].range_2}</div>
          <div className={style.fila}>{malla?.items[2].range_2}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 3</div>
          <div className={style.fila}> S/ {malla.items[0].price_3} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_3} x Gal</div>
          <div className={style.fila}> S/ {malla.items[2].price_3} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 3</div>
          <div className={style.fila}>{malla?.items[0].range_3}</div>
          <div className={style.fila}>{malla?.items[1].range_3}</div>
          <div className={style.fila}>{malla?.items[2].range_3}</div>
        </div>
      )}

      {malla?.items?.length === 4 && (
        <div
          className={style.tabla}
          style={{
            gridTemplateColumns: malla?.items?.length === 4 && ".5fr 1fr 1fr 1fr 1fr ",
          }}
        >
          <div className={style.encabezado}></div>
          <div className={style.encabezado}>
            <p>Turno 1</p>
            <span>{`${formatTime(malla.items[0].start_date)} - ${formatTime(malla.items[0].end_date)}`}</span>
          </div>
          <div className={style.encabezado}>
            <p>Turno 2</p>
            <span>{`${formatTime(malla.items[1].start_date)} - ${formatTime(malla.items[1].end_date)}`}</span>
          </div>

          <div className={style.encabezado}>
            <p>Turno 3</p>
            <span>{`${formatTime(malla.items[2].start_date)} - ${formatTime(malla.items[2].end_date)}`}</span>
          </div>
          <div className={style.encabezado}>
            <p>Turno 4</p>
            <span>{`${formatTime(malla.items[3].start_date)} - ${formatTime(malla.items[3].end_date)}`}</span>
          </div>

          <div className={`${style.fila} ${style.roja}`}>Precio 1</div>
          <div className={style.fila}> S/ {malla.items[0].price_1} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_1} x Gal</div>
          <div className={style.fila}> S/ {malla.items[2].price_1} x Gal</div>
          <div className={style.fila}> S/ {malla.items[3].price_1} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 1</div>
          <div className={style.fila}>{malla?.items[0].range_1}</div>
          <div className={style.fila}>{malla?.items[1].range_1}</div>
          <div className={style.fila}>{malla?.items[2].range_1}</div>
          <div className={style.fila}>{malla?.items[3].range_1}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 2</div>
          <div className={style.fila}> S/ {malla.items[0].price_2} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_2} x Gal</div>
          <div className={style.fila}> S/ {malla.items[2].price_2} x Gal</div>
          <div className={style.fila}> S/ {malla.items[3].price_2} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 2</div>
          <div className={style.fila}>{malla?.items[0].range_2}</div>
          <div className={style.fila}>{malla?.items[1].range_2}</div>
          <div className={style.fila}>{malla?.items[2].range_2}</div>
          <div className={style.fila}>{malla?.items[3].range_2}</div>

          <div className={`${style.fila} ${style.roja}`}>Precio 3</div>
          <div className={style.fila}> S/ {malla.items[0].price_3} x Gal</div>
          <div className={style.fila}> S/ {malla.items[1].price_3} x Gal</div>
          <div className={style.fila}> S/ {malla.items[2].price_3} x Gal</div>
          <div className={style.fila}> S/ {malla.items[3].price_3} x Gal</div>

          <div className={`${style.fila} ${style.roja}`}>Rango 3</div>
          <div className={style.fila}>{malla?.items[0].range_3}</div>
          <div className={style.fila}>{malla?.items[1].range_3}</div>
          <div className={style.fila}>{malla?.items[2].range_3}</div>
          <div className={style.fila}>{malla?.items[3].range_3}</div>
        </div>
      )}
    </>
  );
};

export default MallaturnTable;
