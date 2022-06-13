import axios from "axios"

const baseURL = "http://localhost:3000/"

const client = axios.create({
    baseURL,
    withCredentials: true,
    validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 400
    },
})

export default client
