import MyButton from '../Button'
import {useEffect} from 'react'
import styles from './CardProduct.module.css'
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart, MdShoppingCart} from "react-icons/md";
import { useGlobalItens } from '../../context/globalItens';
import { apiFelipe } from '../../http/api';
import { fetchData } from '../../functions/requisitions';

export default function CardProduct ({title, price, id, amount, cartActive, openModal, setModal} : {title:string, price:string, id:number, amount:number, cartActive:boolean, openModal: boolean, setModal: any}) {
    
    const globalItens = useGlobalItens()

    const filterIDCartProduct: any = globalItens?.cartItens.filter((item) => {
        return item.productID === id
    })


     useEffect(() => {
         fetchData(apiFelipe, 'cart', globalItens?.setCartItens);
     },[])

     const Cart = () => {
        if(!cartActive){
            apiFelipe.post('cart', {
                productName: title,
                productPrice: price,
                productQTD: amount,
                amountInCart: 1,
                productID: id
            }).then ((response) => {
                console.log(response)
                fetchData(apiFelipe, 'cart', globalItens?.setCartItens);
            })
        }
        else if (cartActive){
             apiFelipe.delete(`cart/${filterIDCartProduct[0].id}`)
             .then (() => {
                fetchData(apiFelipe, 'cart', globalItens?.setCartItens);
             })
        }
    }
    
    
    return (
            <div className={styles.card_div}>
                <div className={styles.icons} >
                    <a onClick={() => Cart()}>
                        {cartActive? <> <MdShoppingCart className={styles.icon_active}/> </>: <MdOutlineShoppingCart className={styles.icon}/>}
                    </a>
                    <FaHeart className={styles.icon}/>
                </div>
                <div className={styles.div_img}>
                    <img src='https://gtqcec.ufpa.br/images/galeria_em_artigos/image03_grd.png' alt='imagem do produto'/>
                </div>
                <h1>{title}</h1>
                <p>Preço: R${price}</p>
                    <MyButton onClick={() => setModal(!openModal)}>Comprar</MyButton>
            </div>
    )
}