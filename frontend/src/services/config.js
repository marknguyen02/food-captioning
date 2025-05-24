import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://54.254.2.12:8000',
    headers: {
        "Content-Type": 'application/json'
    },
    withCredentials: true
})