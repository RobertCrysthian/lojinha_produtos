import { createContext, useContext, useState } from "react";
import { iGlobalItens } from "../../interfaces/iGlobalItens";
import { IproductCart } from "../../interfaces/iProductCart";

export const GlobalItensContext = createContext<iGlobalItens | null>(null)

export const useGlobalItens = () => {
    const context = useContext(GlobalItensContext);
    return context;
}

export const GlobalItensProvider = ({children} : {children : JSX.Element}) => {
    const [cartItens, setCartItens] = useState<IproductCart[]>([])
    const [openCartModal, setOpenCartModal] = useState(true)


        var totalSum: any = 0
        for (var i = 0; i < cartItens.length!; i++) {
            totalSum += cartItens[i].productPrice! * cartItens[i].amountInCart!
        }
        
    return ( <GlobalItensContext.Provider value={{ cartItens, setCartItens, openCartModal, setOpenCartModal, totalSum}}>{children}</GlobalItensContext.Provider>)
}

