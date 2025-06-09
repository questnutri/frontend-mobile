import axios from "./axiosInstance";

export const resetPassword = async (email: string) => {
    console.log('entrei');

    try {
        const response = await axios.post('/auth/reset-password', { email })
        console.log('recebi');


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