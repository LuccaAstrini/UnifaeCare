import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/api';
import { useRequest } from './useRequest';
import { STORAGE_KEYS } from '../constants/storageKeys';

export function useExercise(prescriptionItemId, navigation) {
    const [exerciseDetails, setExerciseDetails] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [steps, setSteps] = useState(null);
    const [successVisible, setSuccessVisible] = useState(false);
    const [exerciseTitle, setExerciseTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [objective, setObjective] = useState('');
    const [videoUrl, setVideoUrl] = useState(null);
    const { loading, error, clearError, run } = useRequest();

    useEffect(() => {
        if (!prescriptionItemId) return;
        run(async () => {
            const details = await ApiService.getExerciseByPrescriptionItemId(prescriptionItemId);
            console.log('Exercise details:', details);
            setExerciseDetails(details);
            setMetrics(details.metrics);
            setSteps(details.steps);
            setNotes(details.physiotherapistNotes)
            setExerciseDescription(details.description);
            setObjective(details.taxonomy.objective);
            setExerciseTitle(details.title);
            setVideoUrl(details.videoUrl ?? null);
        }, 'Erro ao carregar o exercício.');
    }, [prescriptionItemId]);

    async function handleComplete() {
        await run(async () => {
            const info = JSON.stringify({ doFeedback: false, createdAt: Date.now() });
            await AsyncStorage.setItem(STORAGE_KEYS.EXERCISE(prescriptionItemId), info);
            setSuccessVisible(true);
        }, 'Erro ao salvar o exercício.');
    }

    function handleSuccessClose() {
        setSuccessVisible(false);
        navigation.navigate('FeedbackView', { props: prescriptionItemId });
    }

    return { notes, exerciseDetails, metrics, steps, exerciseTitle, successVisible, handleSuccessClose, loading, error, clearError, handleComplete, objective, exerciseDescription, videoUrl };
}
