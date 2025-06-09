import axios from "./axiosInstance";

export const changePassword = async (token: string, newPassword: string) => {
    try {
        const response = await axios.post(`/auth/reset-password/execute/${token}`, { newPassword });
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