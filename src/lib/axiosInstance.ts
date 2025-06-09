import axiosInstance from 'axios'
import * as SecureStore from 'expo-secure-store'

const grokUrl = "https://active-mildly-swine.ngrok-free.app"

const apiUrl = `${grokUrl}/api/v1`

const axios = axiosInstance.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    validateStatus: (status) => status < 500,
})

axios.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync('token')
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
        } catch (error) {
            console.log('Erro ao pegar token do SecureStore', error)
        }

        return config
    },
    (error) => Promise.reject(error)
)

export default axios
