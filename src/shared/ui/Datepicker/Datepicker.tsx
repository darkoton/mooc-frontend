import { useRef } from 'react'
import Calendar from './icons/calendar.svg?react'

import s from './Datepicker.module.scss'

type DatepickerProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void
}

export default function Datepicker({ label, value, onChange }: DatepickerProps) {
  const id = useRef<string>((Math.random() * 10000).toFixed())
  const input = useRef<null | HTMLInputElement>(null)

  function openCalendar() {
    if (!input.current) {
      return
    }
    input.current.showPicker();
  }

  return <div className={s.field}>
    {label && <label className={s.label} htmlFor={id.current}>{label}</label>}


    <div onClick={openCalendar} className={s.body}>
      <Calendar />
      <input ref={input}
        className={s.input} type='date' onChange={(e) => onChange(e.target.value)} value={value} />
    </div>
  </div>

}