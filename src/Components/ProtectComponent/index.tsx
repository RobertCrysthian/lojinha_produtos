
import { UseAuth } from "../../context/useAuth"


export default function ProtectedComponent ({children}: any) {
    const context = UseAuth()

    if (!context?.email) {
        return <h1>Não pode ver</h1>
    }

    return children
}