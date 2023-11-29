import { message } from 'antd'
import MyButton from '../../Components/Button'
import MyInput from '../../Components/MyInput'
import { UseAuth } from '../../context/useAuth'
import styles from './Login.module.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const [inputName, setInputName] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const navigate = useNavigate()
    const auth = UseAuth()
    
    const login = async () => {
        try {
         await auth?.authenticate(inputName, inputPassword)
         navigate('/1')
         } catch (error) {
            message.error('Email ou senha inválido')
         }
    }

    return (
        <section>
            <section className={styles.section_login}>
                <div>
                <h1>Mercadinho</h1>
                    <MyInput name='Nome do usuário' placeholder='Informe o nome do usuário' value={inputName} onChange={setInputName}/>
                    <MyInput name='Senha' placeholder='Informe a senha' type='password' value={inputPassword} onChange={setInputPassword}/>
                    <MyButton onClick={login}>Enviar</MyButton>
                </div>

            </section>
        </section>
    )
}