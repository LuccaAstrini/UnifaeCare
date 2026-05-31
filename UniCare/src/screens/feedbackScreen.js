import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from '../components/cards/Card';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import PositiveButton from '../components/buttons/PositiveButton';
import icons from '../icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GREEN_1 } from '../styles/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../services/api';
import LoadingModal from "../components/modals/LoadingModal";
import ErrorModal from '../components/modals/ErrorModal';
import SuccessModal from '../components/modals/SuccessModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRequest } from '../hooks/useRequest';
import { STORAGE_KEYS } from '../constants/storageKeys';

const feedbackLevels = [
    { id: 1, emoji: 'emoji-sem-dor', title: 'Sem Dor/Esforço', description: 'Absolutamente confortável', value: 0 },
    { id: 2, emoji: 'emoji-leve', title: 'Leve', description: 'Atividade tranquila e sustentável', value: 2 },
    { id: 3, emoji: 'emoji-moderado', title: 'Moderado', description: 'Senti o esforço, mas sem dor', value: 5 },
    { id: 4, emoji: 'emoji-intenso', title: 'Intenso', description: 'Exigiu bastante concentração', value: 8 },
    { id: 5, emoji: 'emoji-exaustao', title: 'Exaustão', description: 'Limite físico atingido', value: 10 },
];

export default function FeedbackScreen({ navigation, route }) {
    const prescriptionItemId = route.params?.props;
    const [selectedLevel, setSelectedLevel] = useState(3);
    const [observations, setObservations] = useState('');
    const [successVisible, setSuccessVisible] = useState(false);
    const { loading, error, clearError, run } = useRequest();

    async function handleSaveFeedback() {
        await run(async () => {
            const executionId = (await ApiService.completeExercise(prescriptionItemId)).executionId;
            const feedbackData = {
                score: feedbackLevels.find(level => level.id === selectedLevel)?.value || 0,
                notes: observations,
            };
            await ApiService.sendFeedback(executionId, feedbackData);
            await AsyncStorage.removeItem(STORAGE_KEYS.EXERCISE(prescriptionItemId));
            setSuccessVisible(true);
        }, 'Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.');
    }

    return (
        <SafeAreaView style={styles.container}>
            <SuccessModal
                visible={successVisible}
                onClose={() => {
                    setSuccessVisible(false);
                    navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
                }}
                message="Feedback enviado com sucesso!"
            />
            {loading
                ? <LoadingModal visible={true} message="Enviando feedback..." />
                : <ErrorModal visible={!!error} message={error} onClose={clearError} />
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
                        {feedbackLevels.map((item) => {
                            const Icon = icons[item.emoji];
                            return (
                                <TouchableOpacity key={item.id} onPress={() => setSelectedLevel(item.id)}>
                                    <Card style={[styles.card, selectedLevel === item.id && styles.selectedCard]}>
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
                        value={observations}
                        multiline
                        onChangeText={setObservations}
                    />

                    <View style={styles.logoBanner}>
                        <Image source={require('../../assets/unifae_logo_small.png')} style={styles.bannerLogo} resizeMode="contain" />
                        <CustomText variant="bodyMedium" style={styles.bannerText}>Seu progresso é nossa prioridade.</CustomText>
                    </View>
                </View>

                <View style={styles.footer}>
                    <PositiveButton title="Salvar Feedback" onPress={handleSaveFeedback} />
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
