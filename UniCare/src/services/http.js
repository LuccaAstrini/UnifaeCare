import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { navigate } from './navigationRef';

export const BASE_URL = 'http://185.217.125.219:3000/api/v1';

const http = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

http.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('api_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const message = error.response?.data?.message ?? error.message;
        const status = error.response?.status ?? null;

        if (status === 401) {
            await SecureStore.deleteItemAsync('api_token');
            navigate('LoginView', { sessionExpiredMessage: 'Sua sessão expirou. Por favor, faça login novamente.' });
        }

        console.error('API Error:', { message, status, error });

        const err = new Error(message);
        err.status = status;
        throw err;
    }
);

export default http;
