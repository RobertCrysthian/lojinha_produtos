import { AxiosInstance } from "axios";

export function fetchData (apiName:AxiosInstance, type:string, setArray:any) {
    apiName.get(type)
    .then(response => setArray(response.data))
}