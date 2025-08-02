import style from './style.module.scss'

export type ItemType = {
  value: string;
  label: string;
}

type PropsType = {
  className?: string
  value?: string;
  items?: ItemType[];
  onChange?: (value: string) => void
}

const Tabs = ({
  className,
  value,
  items = [],
  onChange = () => { }
}: PropsType) => {
  return <div className={`${style.tabs} ${className}`}>
    {items.map((item) => <button key={item.value} onClick={() => onChange(item.value)}
      className={`p-bold-responsive ${style.tab} ${value === item.value ? style.active : ''}`}>{item.label}</button>
    )}
  </div>
}

export default Tabs