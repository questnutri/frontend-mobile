import { findToken } from "./findToken";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.123:3030/api/v1';

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = await findToken('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });

    return response;
};
