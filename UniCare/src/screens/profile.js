import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import * as FileSystem from 'expo-file-system/legacy';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import CustomText from "../components/CustomText";
import ApiService from "../services/api";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

const BASE_URL = 'http://185.217.125.219:3000/api/v1';
import Card from "../components/cards/Card";
import { GREEN_3, GREEN_4 } from "../styles/Colors";
import LoadingModal from "../components/modals/LoadingModal";
import ErrorModal from "../components/modals/ErrorModal";
import { useRequest } from "../hooks/useRequest";

function InfoCard({ label, value }) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
        }}>
            {label && <CustomText variant="bodyMedium" style={{ color: GREEN_3 }}>{label}</CustomText>}
            <CustomText variant="bodyMedium" style={{ color: GREEN_3 }}>{value}</CustomText>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: GREEN_4 }} />
        </View>
    )
}

export default function Profile({ navigation }) {
    const [userInfo, setUserInfo] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [photoSource, setPhotoSource] = useState(null);
    const { loading, error, clearError, run } = useRequest();

    async function fetchUserData() {
        const tempData = await ApiService.getUserInfo();
        const userData = tempData.profile;
        const studentData = tempData.responsibleStudent;
        setUserInfo(userData);
        setStudentInfo(studentData);
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

    async function loadUserInfo() {
        await run(fetchUserData, 'Erro ao carregar informações do usuário');
    }

    async function uploadProfilePhoto() {
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

    useFocusEffect(
        useCallback(() => {
            loadUserInfo();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            {loading
                ? <LoadingModal visible={true} message="Consultando suas informações..." />
                : <ErrorModal visible={!!error} message={error} onClose={clearError} />
            }

            <TouchableOpacity style={styles.avatarContainer} onPress={uploadProfilePhoto}>
                {photoSource ? (
                    <Image source={photoSource} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                        <CustomText style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>
                            {userInfo?.name?.charAt(0)?.toUpperCase() ?? '?'}
                        </CustomText>
                    </View>
                )}
                <View style={styles.cameraIcon}>
                    <Ionicons name="camera" size={18} color="white" />
                </View>
            </TouchableOpacity>

            <CustomText>
                {userInfo !== null ? userInfo?.name : ''}
            </CustomText>

            <Card style={{ width: '90%' }}>
                <CustomText variant="bodyLarge" style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Informações do usuário
                </CustomText>
                {userInfo !== null ? (
                    <>
                        <InfoCard label="Email" value={userInfo.email} />
                        <InfoCard label="Celular" value={userInfo.phone} />
                    </>
                ) : (<></>)}
            </Card>

            <Card style={{ width: '90%' }}>
                <CustomText variant="bodyLarge" style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Responsáveis
                </CustomText>
                {studentInfo !== null ? (
                    <InfoCard value={studentInfo?.name} />
                ) : (
                    <CustomText variant="bodyMedium"></CustomText>
                )}
            </Card>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: "center",
        flex: 1
    },
    avatarContainer: {
        marginBottom: 12,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        backgroundColor: GREEN_3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: GREEN_3,
        borderRadius: 14,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
});
