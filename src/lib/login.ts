import axios from "./axiosInstance"

export interface ILoginRequest {
    email: string
    password: string
}

export interface ILoginResponse {
    token?: string
    status?: number
    error?: string
    role?: string
}

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
    const bodyRequest = {
        email: data.email,
        password: data.password
    }

    try {
        const response = await axios.post('/auth/login', bodyRequest)
        return {
            status: response.status,
            ...response.data,
        }
    } catch (error: any) {
        return {
            status: error.response?.status,
            error: error.response?.data?.error,
        }
    }
}
