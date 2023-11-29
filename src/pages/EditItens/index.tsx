import { useState } from 'react'
import MyButton from '../../Components/Button'
import Modal from '../../Components/Modal'
import MyInput from '../../Components/MyInput'
import styles from './EditItens.module.css'
import { IproductList } from '../../interfaces/iProductList'

export default function EditItens() {
    const [newName, setNewName] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newStock, setNewStock] = useState('')
    const [productList] = useState<IproductList[]>([])

    const [openModal, setOpenModal] = useState(false)

    // const createNewProduct = () => {
    //     const formatPrice = parseInt(newPrice)
    //     const formatStock = parseInt(newStock)

    //     apiFelipe.post('product/new', {
    //         productName: newName,
    //         productQTD: formatStock,
    //         productPrice: formatPrice,
    //         //loadLocalJson: true
    //     })
    // }

    // useEffect(() => {
    //     apiFelipe.get('product/listall')
    //         .then(response => setProductList(response.data))
    // }, [])

    return (
        <section className={styles.section_edit_itens}>
            <div className={styles.div_edit_itens}>
                <h1 className={styles.edit_itens_title}>GERENCIADOR DE PRODUTOS</h1>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Preço</td>
                            <td>Quantidade</td>
                            <td>Editar</td>
                            <td>Excluir</td>
                        </tr>
                    </thead>
                    {productList.map(item => {
                        return (
                            <tbody>
                                <tr >
                                    <td>{item.id}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.productPrice}</td>
                                    <td>{item.productQTD}</td>
                                    <td><button className={styles.button_edit_itens}>Editar</button></td>
                                    <td><button className={styles.button_edit_itens}>Excluir</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

                <div className={styles.div_button}>
                    <MyButton onClick={() => setOpenModal(!openModal)}>Adicionar Produto</MyButton>
                </div>

                <Modal title='Criar novo produto' isOpen={openModal} closeModal={() => setOpenModal(!openModal)}>
                    <div className={styles.div_edit_modal}>
                        <h1>Nome</h1>
                        <MyInput name="Nome do produto" value={newName} onChange={setNewName} />
                        <MyInput name="Preço do produto" value={newPrice} onChange={setNewPrice} />
                        <MyInput name="Quantidade de estoque" value={newStock} onChange={setNewStock} />
                        <MyButton >Enviar</MyButton>
                    </div>
                </Modal>
            </div>
        </section>
    )
}