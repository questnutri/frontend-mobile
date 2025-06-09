import axios from "./axiosInstance";
export interface ILogoutResponse {
    status?: number
    error?: string
}

export const logout = async (): Promise<ILogoutResponse> => {
    try {
        const response = await axios.post('/auth/logout');
        console.log(response.status)

        return {
            status: response.status,
            ...response.data,
        };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            error: error.response?.data?.error || 'Erro inesperado ao fazer logout',
        };
    }
};
