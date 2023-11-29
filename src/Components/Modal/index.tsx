import {AiOutlineClose} from 'react-icons/ai'
import styles from './Modal.module.css'

export default function Modal({isOpen, closeModal, children, title, description} : {isOpen:any , closeModal:() => void, children: React.ReactNode, title?: string, description?: string}) {
    if (isOpen) return (
        
        <div className={styles.background_style}>
            <div className={styles.div_modal}>
                <div className={styles.div_icon}>
                    <AiOutlineClose className={styles.icon} onClick={closeModal}/>
                </div>
                <h2 className={styles.title_modal}>{title}</h2>
                <h3 className={styles.description_modal}>{description}</h3>
                <div className={styles.div_content}>
                        {children}
                </div>
            </div>
        </div>
    ) 
    return null

}