import React from 'react'
import style from './IslaContentStructure.module.css'

export const IslaContentStructure = ({children}) => {
  return (
    <div className={style.islaContentStructure__container}>{children}</div>
  )
}
