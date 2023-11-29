import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8090/'
})

export const apiFelipe = axios.create({
    baseURL: 'http://localhost:8080/'
})