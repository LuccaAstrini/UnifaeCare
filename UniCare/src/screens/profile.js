import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CustomText from "../components/CustomText";
import Card from "../components/cards/Card";
import { GREEN_3, GREEN_4 } from "../styles/Colors";
import LoadingModal from "../components/modals/LoadingModal";
import ErrorModal from "../components/modals/ErrorModal";
import { useProfile } from "../hooks/useProfile";

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
    );
}

export default function Profile() {
    const vm = useProfile();

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            {vm.loading
                ? <LoadingModal visible={true} message="Consultando suas informações..." />
                : <ErrorModal visible={!!vm.error} message={vm.error} onClose={vm.clearError} />
            }

            <TouchableOpacity style={styles.avatarContainer} onPress={vm.handleUploadPhoto}>
                {vm.photoSource ? (
                    <Image source={vm.photoSource} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                        <CustomText style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>
                            {vm.userInfo?.name?.charAt(0)?.toUpperCase() ?? '?'}
                        </CustomText>
                    </View>
                )}
                <View style={styles.cameraIcon}>
                    <Ionicons name="camera" size={18} color="white" />
                </View>
            </TouchableOpacity>

            <CustomText>
                {vm.userInfo !== null ? vm.userInfo?.name : ''}
            </CustomText>

            <Card style={{ width: '90%' }}>
                <CustomText variant="bodyLarge" style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Informações do usuário
                </CustomText>
                {vm.userInfo !== null ? (
                    <>
                        <InfoCard label="Email" value={vm.userInfo.email} />
                        <InfoCard label="Celular" value={vm.userInfo.phone} />
                    </>
                ) : (<></>)}
            </Card>

            <Card style={{ width: '90%' }}>
                <CustomText variant="bodyLarge" style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Responsáveis
                </CustomText>
                {vm.studentInfo !== null && vm.coordinatorInfo !== null ? (
                    <>
                        <InfoCard value={vm.studentInfo?.name} />
                        <InfoCard value={vm.coordinatorInfo?.name} />
                    </>
                ) : (
                    <CustomText variant="bodyMedium"></CustomText>
                )}
            </Card>
        </SafeAreaView>
    );
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
