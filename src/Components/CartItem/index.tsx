import { useEffect } from 'react';
import { useGlobalItens } from '../../context/globalItens';
import { apiFelipe } from '../../http/api';
import styles from './CartItem.module.css'
import { IoCloseCircleOutline } from "react-icons/io5";
import { fetchData } from '../../functions/requisitions';

export default function CartItem({ name, price, img, amount, amountInCart, id }: { name: string, price: number, img: string, amount: number, amountInCart: number, id: number }) {
    
    const globalItens = useGlobalItens();

     useEffect(() => {
        fetchData(apiFelipe, 'cart', globalItens?.setCartItens)
     },[])



    const removeItem = (id: number) => {
        apiFelipe.delete(`cart/${id}`)
        .then(() => {
            fetchData(apiFelipe, 'cart', globalItens?.setCartItens)
        })
    }

    const addAmount = (id: number) => {
        if(amountInCart < amount) {
            var increment = amountInCart+1;
        
            apiFelipe.put(`cart/${id}`,{
                productName: name,
                productPrice: price,
                productQTD: amount,
                amountInCart:increment
            })
            .then(() => {
                fetchData(apiFelipe, 'cart', globalItens?.setCartItens)
            })
        }
    }

    const removeAmount = (id: number) => {
        if(amountInCart > 1) {
            var decrement = amountInCart-1;
        
            apiFelipe.put(`cart/${id}`,{
                productName: name,
                productPrice: price,
                productQTD: amount,
                amountInCart:decrement
            })
            .then(() => {
                fetchData(apiFelipe, 'cart', globalItens?.setCartItens)
            })
        }
    }

    
    return (
        <div className={styles.div_cart_item}>

            <div className={styles.justify_content}>
                <h1>{name}</h1>
            </div>

            <div className={styles.justify_content}>
                <p>R${price}</p>
            </div>

            <div className={styles.justify_content}>
                    <img src={img} alt='imagem do produto carrinho' />
            </div>

            <div className={styles.justify_content}>
                <button className={styles.minus} onClick={() => {removeAmount(id)}}>-</button>
                <p className={styles.amount_number}>{amountInCart}</p>
                <button className={styles.plus} onClick={() => {addAmount(id)}}>+</button>
            </div>

            <div className={styles.justify_content}>
                <p>R${(price*amountInCart).toFixed(2)}</p>
            </div>
            
            <div className={styles.div_icon}>
                <IoCloseCircleOutline className={styles.icon} onClick={() => removeItem(id)} />
            </div>
        </div>
    )
}