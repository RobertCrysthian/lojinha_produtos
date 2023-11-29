import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BsCart3, BsPersonFill } from 'react-icons/bs'
import { LuUserCog2 } from "react-icons/lu";
import { IoCubeOutline, IoCartSharp } from "react-icons/io5";
import styles from './Header.module.css'
import stylesMenu from './LateralMenu.module.css'
import stylesCart from './Cart.module.css'
import { useState } from 'react'
import Modal from '../Modal'
import MyButton from '../Button'
import { UseAuth } from '../../context/useAuth';
import { useGlobalItens } from '../../context/globalItens';
import CartItem from '../CartItem';

export default function Header() {
    const [openNav, setOpenNav] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const auth = UseAuth()
    const navigate = useNavigate()

    const globalItens = useGlobalItens()

    const logOut = () => {
        auth?.logout()
        navigate('/login')
    }

    const [initialItem, setInitialItem] = useState(0)
    const [lastItem, setLastItem] = useState(3)
    const [increment] = useState(4)
    const [pageNumber, setPageNumber] = useState(1)

    const previousPage = () => {
        if (initialItem > 0) {
            setInitialItem(initialItem - increment)
            setLastItem(lastItem - increment)
            setPageNumber(pageNumber - 1)
        }
    }

    const nextPage = () => {
        if (globalItens?.cartItens.length! - 1 > lastItem) {
            setInitialItem(initialItem + increment)
            setLastItem(lastItem + increment)
            setPageNumber(pageNumber + 1)
        }
    }


    const navigateToHomeAndCloseModal = () => {
        navigate('/1')
        globalItens?.setOpenCartModal(!globalItens.openCartModal)
    }

    return (
        <section>

            {/* header */}
            <div className={styles.div_header}>
                <AiOutlineMenu className={styles.icon_header} onClick={() => setOpenNav(!openNav)} />
                <AiOutlineHome className={styles.icon_header} />
                <BsPersonFill className={styles.icon_header} onClick={() => setOpenProfile(!openProfile)} />
            </div>

            {/* menu nav */}
            <div className={openNav ? stylesMenu.nav  : stylesMenu.nav_open}>
                <ul className={openNav ? '' : stylesMenu.hidden_nav}>
                    <li className={stylesMenu.menu_item} onClick={() => globalItens?.setOpenCartModal(!globalItens.openCartModal)}>
                        <a href="#">
                            <span className={stylesMenu.icon_menu}><BsCart3 /></span>
                            <span className={stylesMenu.txt_link}>Carrinho</span>
                        </a>
                    </li>
                    <li className={stylesMenu.menu_item}>
                        <a href='/1'>
                            <span className={stylesMenu.icon_menu}><AiOutlineHome /></span>
                            <span className={stylesMenu.txt_link}>Home</span>
                        </a>
                    </li>
                    <h1 className={stylesMenu.admin_text}>Administração:</h1>
                    <li className={stylesMenu.menu_item}>
                        <Link to='/editItens'>
                            <span className={stylesMenu.icon_menu}><IoCubeOutline /></span>
                            <span className={stylesMenu.txt_link}>Gerente de produtos</span>
                        </Link>
                    </li>
                    <li className={stylesMenu.menu_item}>
                        <Link to='#'>
                            <span className={stylesMenu.icon_menu}><LuUserCog2 /></span>
                            <span className={stylesMenu.txt_link}>Gerente de usuários</span>
                        </Link>
                    </li>

                </ul>
            </div>

            {/* Profile Nav */}
            <div className={openProfile ? stylesMenu.open_profile : stylesMenu.hidden_profile}>
                <div className={openProfile ? stylesMenu.div_profile_nav : stylesMenu.hidden_nav}>
                    <div className={stylesMenu.justify_profile_nav}>
                        <h1>Nome: </h1>
                        <h1>CPF: </h1>
                        <img src='https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/canvaai.png' alt='imagem de perfil' />
                    </div>
                    <div>
                        <MyButton>Editar Perfil</MyButton>
                        <MyButton onClick={logOut}>Logout</MyButton>
                    </div>

                </div>
            </div>

            <Outlet />

            {/* Carrinho */}
            <Modal isOpen={!globalItens?.openCartModal} closeModal={() => globalItens?.setOpenCartModal(!globalItens.openCartModal)} title="MEU CARRINHO">
                <section className={stylesCart.section_modal}>
                    {globalItens?.cartItens.length! > 0
                        ?
                        <div className={stylesCart.div_modal}>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço</th>
                                        <th>Imagem</th>
                                        <th>Quantidade</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className={stylesCart.cartItens}>
                                {globalItens?.cartItens.map((item, index) => {
                                    while (index >= initialItem && index <= lastItem) {
                                        return (
                                            <CartItem
                                                key={item.id}
                                                amount={item.productQTD}
                                                id={item.id}
                                                img='https://agenciadenoticias.ms.gov.br/wp-content/uploads/2023/05/MS-da-Imagem-e-Som-730x480.png'
                                                name={item.productName}
                                                price={item.productPrice}
                                                amountInCart={item.amountInCart}
                                            />
                                        )
                                    }
                                    return null
                                })}
                            </div>
                            <div className={stylesCart.page_navigation}>
                                <MyButton onClick={() => previousPage()}>{`<<`}</MyButton>
                                <h1>{pageNumber}</h1>
                                <h1>-</h1>
                                <h1>{Math.ceil(globalItens?.cartItens.length! / 4)}</h1>
                                <MyButton onClick={() => nextPage()}>{`>>`}</MyButton>
                            </div>
                            <p>Sub-total: R${globalItens?.totalSum.toFixed(2)}</p>
                            <MyButton>Comprar</MyButton>
                        </div>
                        :
                        <div className={stylesCart.placeholder_cart}>
                            <h1>Seu carrinho está vazio</h1>
                            <p>Deseja olhar outros produtos similares?</p>
                            <MyButton onClick={() => navigateToHomeAndCloseModal()}><IoCartSharp/>CONTINUAR COMPRANDO</MyButton>
                        </div>
                        
                    }
                </section>
            </Modal>
        </section>
    )
}