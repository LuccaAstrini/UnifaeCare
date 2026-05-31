import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';
import homeService from '../services/homeService';
import { STORAGE_KEYS } from '../constants/storageKeys';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function signIn(email, password) {
        const response = await authService.login(email, password);
        await SecureStore.setItemAsync('api_token', response.access_token);
        const userInfo = await homeService.getUserInfo();
        const profile = userInfo.profile;
        await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, profile.name || 'Usuário');
        await authService.acceptTerms();
        setUser(profile);
    }

    async function signOut() {
        await SecureStore.deleteItemAsync('api_token');
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_NAME);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
