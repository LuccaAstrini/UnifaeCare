import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system/legacy';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import ApiService from '../services/api';
import { useRequest } from './useRequest';
import { BASE_URL } from '../services/http';

export function useProfile() {
    const [userInfo, setUserInfo] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [photoSource, setPhotoSource] = useState(null);
    const [coordinatorInfo, setCoordinatorInfo] = useState(null);
    const { loading, error, clearError, run } = useRequest();

    async function fetchUserData() {
        const tempData = await ApiService.getUserInfo();
        const userData = tempData.profile;
        const studentData = tempData.responsibleStudent;
        const coordinatorData = tempData.coordinator;
        setUserInfo(userData);
        setStudentInfo(studentData);
        setCoordinatorInfo(coordinatorData);
        if (userData.id) {
            const token = await SecureStore.getItemAsync('api_token');
            const localUri = FileSystem.cacheDirectory + 'profile_photo.jpg';
            await FileSystem.deleteAsync(localUri, { idempotent: true });
            const result = await FileSystem.downloadAsync(
                `${BASE_URL}/app/home/profile/photo/${userData.id}`,
                localUri,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (result.status === 200) {
                setPhotoSource({ uri: result.uri });
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            run(fetchUserData, 'Erro ao carregar informações do usuário');
        }, [])
    );

    async function handleUploadPhoto() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        const formData = new FormData();
        formData.append('file', {
            uri: asset.uri,
            name: 'profile_photo.jpg',
            type: 'image/jpeg',
        });

        await run(async () => {
            await ApiService.postUserPhoto(formData);
            await fetchUserData();
        }, 'Erro ao enviar a foto');
    }

    return { userInfo, studentInfo, coordinatorInfo, photoSource, loading, error, clearError, handleUploadPhoto };
}
