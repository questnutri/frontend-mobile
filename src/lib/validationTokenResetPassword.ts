import axios from "./axiosInstance";

export const validateTokenResetPassword = async (token: string) => {
    try {
        const response = await axios.post(`/auth/reset-password/validate/${token}`)
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error: any) {
        console.error(error);
        return {
            status: error.response?.status || 500,
            error: error.response?.data || 'Erro desconhecido',
        };
    }
}