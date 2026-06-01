import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/api';
import { useRequest } from './useRequest';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const FEEDBACK_LEVELS = [
    { id: 1, emoji: 'emoji-sem-dor', title: 'Sem Dor/Esforço', description: 'Absolutamente confortável', value: 0 },
    { id: 2, emoji: 'emoji-leve', title: 'Leve', description: 'Atividade tranquila e sustentável', value: 2 },
    { id: 3, emoji: 'emoji-moderado', title: 'Moderado', description: 'Senti o esforço, mas sem dor', value: 5 },
    { id: 4, emoji: 'emoji-intenso', title: 'Intenso', description: 'Exigiu bastante concentração', value: 8 },
    { id: 5, emoji: 'emoji-exaustao', title: 'Exaustão', description: 'Limite físico atingido', value: 10 },
];

export function useFeedback(prescriptionItemId, navigation) {
    const [selectedLevel, setSelectedLevel] = useState(3);
    const [observations, setObservations] = useState('');
    const [successVisible, setSuccessVisible] = useState(false);
    const { loading, error, clearError, run } = useRequest();

    async function handleSend() {
        await run(async () => {
            const executionId = (await ApiService.completeExercise(prescriptionItemId)).executionId;
            const feedbackData = {
                score: FEEDBACK_LEVELS.find(level => level.id === selectedLevel)?.value || 0,
                notes: observations,
            };
            await ApiService.sendFeedback(executionId, feedbackData);
            await AsyncStorage.removeItem(STORAGE_KEYS.EXERCISE(prescriptionItemId));
            setSuccessVisible(true);
        }, 'Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.');
    }

    function handleSuccessClose() {
        setSuccessVisible(false);
        navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
    }

    return {
        selectedLevel,
        setSelectedLevel,
        observations,
        setObservations,
        successVisible,
        handleSuccessClose,
        loading,
        error,
        clearError,
        handleSend,
        FEEDBACK_LEVELS,
    };
}
