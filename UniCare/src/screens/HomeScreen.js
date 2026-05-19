import { View } from "react-native";
import TabNavigator from "./TabNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/cards/Card";
import CustomText from "../../components/CustomText";
import { GRAY_1, GREEN_1, GREEN_2, GREEN_3, GREEN_4 } from "../styles/Colors";
import PositiveButton from "../../components/buttons/PositiveButton";
import CircularIndicator from "../../components/CircularIndicator";
import ApiService from "../services/api";
import React, { useEffect, useState } from 'react';
import ErrorModal from '../../components/modals/ErrorModal';
import LoadingModal from '../../components/modals/LoadingModal';
import ExerciseCard from "../../components/cards/ExerciseCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [exercise, setExercise] = useState(null);
  const progressText = progressValue < 25 ? "Você precisa exercitar" : progressValue < 75 ? "Você esta indo bem!" : "Parabens pelo resultado da semana!";

  async function getHomeInfo() {
    try {
      setLoading(true);
      setUserName(await AsyncStorage.getItem('user_name') || 'Usuário');
      const { motivation, nextExercise, painToday, plan } = await ApiService.getHomeInfo();
      setProgressValue(plan.percentCompleted);
      const exerciseData = {
        name: nextExercise.exerciseName,
        region1: nextExercise.axis,
        objective: nextExercise.objective,
        exercisesCount: plan.totalExercises,
        onPress: () => {}
      }
      setExercise(exerciseData);
    } catch (error) {
      console.error('Error fetching home info:', error);
      setErrorMessage('Erro ao carregar informações da home');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (exercise === null) {
      getHomeInfo();
    }
  }, [exercise]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10, alignItems: 'flex-start' }}>
      <LoadingModal visible={loading} message="Buscando seus exercícios..." />
      <CustomText variant="title" style={{ marginBottom: 16 }}>
        Olá, {userName}!
      </CustomText>
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>

        {exercise !== null && <ExerciseCard exercise={exercise} />}

        <Card style={{ width: '90%' }}>
          <CustomText variant="bodyMedium" style={{ fontWeight: 'bold' }}>
            Progresso
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ marginRight: 15 }}>
              <CircularIndicator value={progressValue} />
            </View>

            <View style={{ flex: 1 }}>
              <CustomText variant="bodyMedium" style={{ marginBottom: 5 }}>
                {progressText}
              </CustomText>
            </View>
          </View>
        </Card>
      </View>
      <ErrorModal
        visible={!!errorMessage}
        message={errorMessage}
        onClose={() => {
          setLoading(false);
          setErrorMessage('');
        }}
      />
    </SafeAreaView>
  );
}