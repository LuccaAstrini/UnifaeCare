import { View, BackHandler } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/cards/Card";
import CustomText from "../components/CustomText";
import { GREEN_1, GREEN_2 } from "../styles/Colors";
import CircularIndicator from "../components/CircularIndicator";
import ApiService from "../services/api";
import React, { useEffect, useState } from 'react';
import ErrorModal from '../components/modals/ErrorModal';
import LoadingModal from '../components/modals/LoadingModal';
import ConfirmModal from '../components/modals/ConfirmModal';
import ExerciseCard from "../components/cards/ExerciseCard";
import { useRequest } from '../hooks/useRequest';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const [progressValue, setProgressValue] = useState(0);
  const [exercise, setExercise] = useState(null);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { loading, error, clearError, run } = useRequest();
  const { user, signOut } = useAuth();
  const progressText = progressValue < 25
    ? "Você precisa exercitar"
    : progressValue < 75
      ? "Você esta indo bem!"
      : "Parabéns pelo resultado da semana!";

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

  async function getHomeInfo() {
    await run(async () => {
      const { nextExercise, plan } = await ApiService.getHomeInfo();
      setProgressValue(plan.percentCompleted);
      if (nextExercise) {
        setExercise({
          name: nextExercise.exerciseName,
          region1: nextExercise.axis,
          objective: nextExercise.objective,
          exercisesCount: plan.totalExercises,
          onPress: () => navigation.navigate('exercise', { props: nextExercise.prescriptionItemId }),
        });
      }
    }, 'Erro ao carregar informações da home');
  }

  useEffect(() => {
    getHomeInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 5, alignItems: 'flex-start' }} edges={['bottom', 'left', 'right']}>
      {loading
        ? <LoadingModal visible={true} message="Buscando seus exercícios..." />
        : <ErrorModal visible={!!error} message={error} onClose={clearError} />
      }
      <ConfirmModal
        visible={logoutVisible}
        title="Sair do aplicativo"
        message="Deseja encerrar sua sessão e voltar para a tela de login?"
        confirmLabel="Sair"
        cancelLabel="Cancelar"
        onCancel={() => setLogoutVisible(false)}
        onConfirm={async () => {
          setLogoutVisible(false);
          await signOut();
          navigation.reset({ index: 0, routes: [{ name: 'LoginView' }] });
        }}
      />
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        {exercise !== null && <ExerciseCard exercise={exercise} />}
        <Card style={{ width: '90%' }}>
          <CustomText variant="bodyMedium" style={{ fontWeight: 'bold' }}>
            Progresso
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ marginRight: 20 }}>
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
    </SafeAreaView>
  );
}
