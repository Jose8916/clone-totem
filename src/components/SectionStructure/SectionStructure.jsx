import style from './SectionStructure.module.css'
export const SectionStructure = ({children, className}) => {
  return (
    <div className={`${style.sectionStructure__container} ${className}`}>
      {children}
    </div>
  )
}
