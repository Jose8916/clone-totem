import React from 'react'
import style from "./Loading.module.css"
const Loading = () => {
  return (
    <div className={style.spinner}>
    <div className={style.dot1}></div>
    <div className={style.dot2}></div>
    <div className={style.dot3}></div>
    </div>
  )
}

export default Loading