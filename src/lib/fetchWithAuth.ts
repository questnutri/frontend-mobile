import { findToken } from "./findToken"; // Adaptado, usando AsyncStorage

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = await findToken('token'); // Precisa await aqui

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, { ...options, headers });

    return response;
};
