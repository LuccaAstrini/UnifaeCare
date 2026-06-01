import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ApiService from '../services/api';
import { useRequest } from './useRequest';
import { useAuth } from '../context/AuthContext';

export function useHome(navigation) {
    const [progressValue, setProgressValue] = useState(0);
    const [exercise, setExercise] = useState(null);
    const [logoutVisible, setLogoutVisible] = useState(false);
    const { loading, error, clearError, run } = useRequest();
    const { user, signOut } = useAuth();

    const progressMessage = progressValue < 25
        ? 'Você precisa exercitar'
        : progressValue < 75
            ? 'Você esta indo bem!'
            : 'Parabéns pelo resultado da semana!';

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setLogoutVisible(true);
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        run(async () => {
            const { nextExercise, plan } = await ApiService.getHomeInfo();
            setProgressValue(plan.percentCompleted);
            if (nextExercise) {
                setExercise({
                    name: nextExercise.exerciseName,
                    region1: nextExercise.axis,
                    objective: nextExercise.objective,
                    exercisesCount: plan.totalExercises,
                    onPress: () => handleStartExercise(nextExercise.prescriptionItemId),
                });
            }
        }, 'Erro ao carregar informações da home');
    }, []);

    function handleStartExercise(prescriptionItemId) {
        navigation.navigate('exercise', { props: prescriptionItemId });
    }

    async function handleLogout() {
        setLogoutVisible(false);
        await signOut();
        navigation.reset({ index: 0, routes: [{ name: 'LoginView' }] });
    }

    return {
        progressValue,
        exercise,
        logoutVisible,
        setLogoutVisible,
        progressMessage,
        loading,
        error,
        clearError,
        handleStartExercise,
        handleLogout,
        user,
    };
}
