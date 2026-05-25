import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Button } from "react-native";
import CustomText from "../../components/CustomText";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
import Card from "../../components/cards/Card";
import { GREEN_3, GREEN_4 } from "../styles/Colors";
import PositiveButton from "../../components/buttons/PositiveButton";
import LoadingModal from "../../components/modals/LoadingModal";
import ErrorModal from "../../components/modals/ErrorModal";

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function loadUserInfo() {
        try {
            setLoading(true);
            const tempData = await ApiService.getUserInfo();
            const userData = tempData.profile
            const studentData = tempData.responsibleStudent
            console.log('User data:', tempData);
            setUserInfo(userData);
            setStudentInfo(studentData);
        } catch (error) {
            console.error('Error fetching user info:', error);
            setError('Erro ao carregar informações do usuário');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userInfo === null) {
            loadUserInfo();
        }
    }, [userInfo]);

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <LoadingModal visible={loading} message="Consultando suas informações..." />
            <ErrorModal visible={error !== ''} message={error} onClose={() => setError('')} />

            <CustomText>
                {userInfo !== null ? userInfo.name : ''}
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
                    <>
                        <InfoCard value={studentInfo.name} />
                    </>
                ) : (
                    <CustomText variant="bodyMedium"></CustomText>
                )}
            </Card>

            <View style={{ width: '90%' }}>
                <PositiveButton style={{ backgroundColor: 'rgb(255, 32, 32)' }} title="Sair" onPress={async () => {
                    navigation.navigate('LoginView');
                }} />
            </View>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
});























