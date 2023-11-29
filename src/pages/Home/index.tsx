import { useEffect, useState } from 'react'
import styles from './home.module.css'
import CardProduct from '../../Components/CardProduct'
import { useNavigate, useParams } from 'react-router-dom'
import MyButton from '../../Components/Button'
import { IproductList } from '../../interfaces/iProductList'
import { apiFelipe } from '../../http/api'
import { useGlobalItens } from '../../context/globalItens'
import { IproductCart } from '../../interfaces/iProductCart'
import { fetchData } from '../../functions/requisitions'

export default function Home () {
    const [itensData, setItensData] = useState<IproductList[]>([])
    const params = useParams<string>()
    const navigate = useNavigate()
    const globalItens = useGlobalItens()



     useEffect(() => {
         fetchData(apiFelipe, 'posts', setItensData);
     },[])


    const initialItem = 0;
    const nextItem = 7;

    let convertedId = parseInt(params.id!)
    let increment = 8

    const previousPage = () => {
        if (convertedId > 1) {
            navigate(`/${convertedId-1}`)
        }
    }

    const nextPage = () => {
        if (convertedId < itensData.length/8) {
            navigate(`/${convertedId+1}`)
        }
    }

    var arrayCart : IproductCart[] = []
    itensData.forEach((i) => {
        globalItens?.cartItens.forEach((j) => {
            if(i.id === j.productID) {
                arrayCart= [...arrayCart, j]
            }
        })
    })


    return(
        <section className={styles.section_home}>
            <h1 className={styles.title}>Lojinha do seu zé - WIP</h1>
            <div className={styles.div_products}>
                {itensData.map((item, index) => {
                    var filter = arrayCart.filter((i :IproductCart) => {
                        return i.productID === item.id
                    })
                    while(index >= initialItem + increment*(convertedId-1) && index <= nextItem + increment*(convertedId-1)) {
                        if(filter.length === 1){
                            return (
                                <CardProduct title={item.productName} price={item.productPrice.toFixed(2)} id={item.id} amount={item.productQTD} key={item.id} cartActive={true} openModal={globalItens?.openCartModal!} setModal={globalItens?.setOpenCartModal}/>
                            )
                        } else {
                            return <CardProduct title={item.productName} price={item.productPrice.toFixed(2)} id={item.id} amount={item.productQTD} key={item.id} cartActive={false} openModal={globalItens?.openCartModal!} setModal={globalItens?.setOpenCartModal}/>
                        }
                    }
                    return null
                })}
            </div>

            <div className={styles.page_navigation}>
                <MyButton onClick={previousPage}>{`<<`}</MyButton>
                <h1>{convertedId}</h1>
                <h1>-</h1>
                <h1>{Math.ceil(itensData.length / 8)}</h1>
                <MyButton onClick={nextPage}>{`>>`}</MyButton>
            </div>

        </section>

    )
}