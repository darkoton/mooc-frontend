import React, { useState, useRef } from 'react'
import PaperClip from './icons/paperClip.svg?react'

import s from './InputFile.module.scss'

type InputFileProps = {
  label?: React.ReactNode
  subLabel?: React.ReactNode
}

export default function InputFile({ label, subLabel }: InputFileProps) {
  const [file, setFile] = useState<File | null>(null)
  const id = useRef<string>((Math.random() * 10000).toFixed())

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  }

  return <div className={s.field}>
    {label && <label className={s.label} htmlFor={id.current}>{label} {subLabel && <span className={s.subLabel}>({subLabel})</span>}</label>}
    <label className={s.body} htmlFor={id.current}>
      <input onChange={onChangeFile} id={id.current} type='file' hidden accept="image/*,.pdf" />
      <PaperClip />

      <span className={s.text}>{file ? <span className={s.name}>{file.name}</span> : 'Upload file'}  </span>
    </label>
  </div>
} 