import AsyncStorage from '@react-native-async-storage/async-storage';

export async function findToken(key: string): Promise<string | null> {
    try {
        const token = await AsyncStorage.getItem(key);
        return token;
    } catch (error) {
        console.error('Erro ao buscar token:', error);
        return null;
    }
}
