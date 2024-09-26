import React from 'react'

const Modales = ({ Modal1,Modal2,Modal3,Modal4,Modal5,Modal6 }) => {
  return (
   <>

     <Modal1 width={"850px"} height={"450px"} title={"Servicio Market"}>
        <h2>Market</h2>
      </Modal1>

      <Modal3 width={"850px"} height={"450px"} title={"Servicio Carwash"}>
        <h2>Carwash</h2>
      </Modal3>

      <Modal4 width={"850px"} height={"450px"} title={"Servicio Cajeros"}>
        <h2>Cajeros</h2>
      </Modal4>

      <Modal5 width={"850px"} height={"450px"} title={"Servicio Llantas"}>
        <h2>Llantas</h2>
      </Modal5>

   </>
  )
}

export default Modales