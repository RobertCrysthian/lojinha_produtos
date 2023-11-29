import styles from './PurchaseConf.module.css'


export default function PurchaseConfirmationModal ({isOpen} : {isOpen:boolean}) {
    if (isOpen) return(
        <section>
            <div className={styles.background}>
                <div className={styles.modal_body}>

                </div>
            </div>
        </section>
    )
    return null
}