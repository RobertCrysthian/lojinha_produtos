import styles from './Button.module.css'

export default function MyButton ({children, onClick} : {children:React.ReactNode, onClick?:() => any,}) {
    return(
            <button className={styles.button} onClick={onClick}>
                {children}
            </button>
    )
}