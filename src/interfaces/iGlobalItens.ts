import { IproductCart } from "./iProductCart";

export interface iGlobalItens  {
    cartItens: IproductCart[],
    setCartItens: any,
    openCartModal?: boolean
    setOpenCartModal?: any
    totalSum: number
}