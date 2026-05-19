import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "./TabNavigator";
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Button } from "react-native";
import CustomText from "../../components/CustomText";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { GREEN_3, GREEN_4 } from "../styles/Colors";
import PositiveButton from "../../components/PositiveButton";
import LoadingModal from "../../components/LoadingModal";

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
        <SafeAreaView style={styles.container}>
            <LoadingModal visible={loading} message="Consultando suas informações..." />

            <CustomText>
                {userInfo ? `${userInfo.name}` : 'Carregando informações...'}
            </CustomText>

            <Card style={{ width: '90%' }}>
                <CustomText variant="bodyLarge" style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Informações do usuário
                </CustomText>

                {userInfo ? (
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

                {studentInfo ? (
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























