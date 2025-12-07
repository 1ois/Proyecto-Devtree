import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL

})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')

    if (token) {
        const ejemplo = config.headers.Authorization = `Bearer: ${token}`
        console.log(ejemplo)

    }
    return config
})
export default api