import AsyncStorage from '@react-native-async-storage/async-storage';
// import { IUser } from "@/models/User.interface";
import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = 'http://192.168.1.28:3030/api/v1';

interface IUser {
    role: 'nutritionist' | 'patient' | 'admin'
    firstName: string
    email: string
}

export const fetchData = async (role: 'nutritionist' | 'patient' | 'admin'): Promise<void> => {
    try {
        const response = await fetchWithAuth(`${API_URL}/${role}s`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data: IUser = await response.json();
            await AsyncStorage.setItem('user', JSON.stringify({
                firstName: data.firstName,
                email: data.email,
            }));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
