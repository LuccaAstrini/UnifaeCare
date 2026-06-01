import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from '../components/cards/Card';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import PositiveButton from '../components/buttons/PositiveButton';
import icons from '../icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GREEN_1 } from '../styles/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from "../components/modals/LoadingModal";
import ErrorModal from '../components/modals/ErrorModal';
import SuccessModal from '../components/modals/SuccessModal';
import { useFeedback } from '../hooks/useFeedback';

export default function FeedbackScreen({ navigation, route }) {
    const prescriptionItemId = route.params?.props;
    const vm = useFeedback(prescriptionItemId, navigation);

    return (
        <SafeAreaView style={styles.container}>
            <SuccessModal
                visible={vm.successVisible}
                onClose={vm.handleSuccessClose}
                message="Feedback enviado com sucesso!"
            />
            {vm.loading
                ? <LoadingModal visible={true} message="Enviando feedback..." />
                : <ErrorModal visible={!!vm.error} message={vm.error} onClose={vm.clearError} />
            }
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tab' }] })}
                        style={{ padding: 5 }}
                    >
                        <Ionicons name="arrow-back" size={28} color={GREEN_1} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <CustomText variant="label" style={styles.sessionTitle}>SESSÃO FINALIZADA</CustomText>
                    <CustomText variant="headlineLarge" style={styles.mainTitle}>Como você se sente?</CustomText>
                    <CustomText variant="bodyMedium" style={styles.description}>
                        Avalie a intensidade de dor ou esforço percebido. Sua resposta ajusta o seu plano.
                    </CustomText>

                    <View style={styles.levelsContainer}>
                        {vm.FEEDBACK_LEVELS.map((item) => {
                            const Icon = icons[item.emoji];
                            return (
                                <TouchableOpacity key={item.id} onPress={() => vm.setSelectedLevel(item.id)}>
                                    <Card style={[styles.card, vm.selectedLevel === item.id && styles.selectedCard]}>
                                        <View style={styles.cardContent}>
                                            <Icon width={30} height={30} style={styles.emoji} />
                                            <View style={styles.cardTextContainer}>
                                                <CustomText variant="bodyLarge">{item.title}</CustomText>
                                                <CustomText variant="label" style={styles.cardDescription}>{item.description}</CustomText>
                                            </View>
                                            <CustomText variant="headlineSmall" style={styles.cardValue}>{item.value}</CustomText>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <CustomText variant="label" style={styles.observationsTitle}>Observações Adicionais</CustomText>
                    <CustomTextInput
                        placeholder="Descreva qualquer desconforto específico ou comentário sobre os exercícios de hoje..."
                        value={vm.observations}
                        multiline
                        onChangeText={vm.setObservations}
                    />

                    <View style={styles.logoBanner}>
                        <Image source={require('../../assets/unifae_logo_small.png')} style={styles.bannerLogo} resizeMode="contain" />
                        <CustomText variant="bodyMedium" style={styles.bannerText}>Seu progresso é nossa prioridade.</CustomText>
                    </View>
                </View>

                <View style={styles.footer}>
                    <PositiveButton title="Salvar Feedback" onPress={vm.handleSend} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    sessionTitle: {
        color: '#00552B',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
    },
    mainTitle: {
        textAlign: 'center',
        marginTop: 8,
        fontWeight: 'bold',
    },
    description: {
        textAlign: 'center',
        marginTop: 16,
        color: '#555',
        lineHeight: 20,
    },
    levelsContainer: {
        marginTop: 20,
    },
    card: {
        width: '100%',
        marginHorizontal: 0,
        padding: 15,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedCard: {
        borderColor: '#008342',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        marginRight: 15,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardDescription: {
        color: '#777',
    },
    cardValue: {
        color: '#555',
        fontWeight: 'bold',
    },
    observationsTitle: {
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    logoBanner: {
        backgroundColor: '#A9A9A9',
        borderRadius: 10,
        padding: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    bannerLogo: {
        width: 120,
        height: 40,
    },
    bannerText: {
        color: 'white',
        marginTop: 10,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },
    header: {},
});
