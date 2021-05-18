import React, {useState} from "react"

import cn from "classnames";

import styles from './Select.module.css'

interface SelectProps  {
  label? : string,
  value : string,
  options: string[],
  selectChange: (value:string)=>void
}

const Select = ({label, value, options, selectChange}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return <div className={cn(styles.select, isOpen ? styles.open : '')} onClick={()=>setIsOpen(!isOpen)}>
    <span>{label}</span>
    <div>
      <span>{value}</span>
      {options.length > 0 && <>
        {isOpen && <div /> }
        <ul>
          {options.map(el => <li onClick={()=>selectChange(el)} className={el === value ? 'font-bold' : ''}>{el}</li>)}
        </ul>
      </>}
    </div>

</div>}

export default Select
