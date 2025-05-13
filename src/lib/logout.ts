export interface ILogoutResponse {
    status?: number
    error?: string
}

export const logout = async (path: string): Promise<ILogoutResponse> => {
    const API_URL = 'http://192.168.1.28:3030/api/v1'; // Defina manualmente ou crie config de ambiente depois

    const response = await fetch(`${API_URL}/auth/${path}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });

    const responseData = await response.json();

    return {
        status: response.status,
        ...responseData,
    };
};
