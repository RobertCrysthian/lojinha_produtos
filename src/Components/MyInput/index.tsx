import styles from './MyInput.module.css'

export default function MyInput ({name, placeholder, type, value, onChange} : {name:string, placeholder?:string, type?:string, value:string, onChange:(e:any) => void}) {
    return(
        <>
        <div className={styles.div_my_input}>
            <label>{name}</label>
        </div>
            <input className={styles.my_input}placeholder={placeholder} type={type} value={value} onChange={(e) => onChange(e.target.value)}/>
        </>
    )
}