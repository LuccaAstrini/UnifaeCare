import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Card from "../components/cards/Card";
import CustomText from "../components/CustomText";
import PositiveButton from "../components/buttons/PositiveButton";
import { GRAY_1, GREEN_1 } from "../styles/Colors";
import ApiService from "../services/api";
import CustomStepText from "../components/texts/CustomStepText";
import LoadingModal from "../components/modals/LoadingModal";
import ErrorModal from "../components/modals/ErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRequest } from "../hooks/useRequest";
import { STORAGE_KEYS } from "../constants/storageKeys";

export default function ExerciseScreen({ navigation, route }) {
  const prescriptionItemId = route.params?.props;
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [steps, setSteps] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const { loading, error, clearError, run } = useRequest();

  async function getExerciseDetails() {
    await run(async () => {
      const hasDone = await AsyncStorage.getItem(STORAGE_KEYS.EXERCISE(prescriptionItemId));
      if (hasDone) {
        navigation.navigate('FeedbackView', { props: prescriptionItemId });
        return;
      }
      const details = await ApiService.getExerciseByPrescriptionItemId(prescriptionItemId);
      setExerciseDetails(details);
      setMetrics(details.metrics);
      setSteps(details.steps);
    }, 'Erro ao carregar o exercício.');
  }

  async function saveExercise() {
    await run(async () => {
      const info = JSON.stringify({ doFeedback: false, createdAt: Date.now() });
      await AsyncStorage.setItem(STORAGE_KEYS.EXERCISE(prescriptionItemId), info);
      setSuccessVisible(true);
    }, 'Erro ao salvar o exercício.');
  }

  useEffect(() => {
    if (prescriptionItemId) {
      getExerciseDetails();
    }
  }, [prescriptionItemId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {loading
        ? <LoadingModal visible={true} message="Carregando exercício..." />
        : <ErrorModal visible={!!error} message={error} onClose={clearError} />
      }
      <SuccessModal
        visible={successVisible}
        onClose={() => {
          setSuccessVisible(false);
          navigation.navigate('FeedbackView', { props: prescriptionItemId });
        }}
      />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%'
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <Ionicons name="arrow-back" size={28} color={GREEN_1} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <CustomText variant="title">Treino do Dia</CustomText>
        </View>
      </View>

      <View style={{ width: '90%', alignSelf: 'center' }}>
        <Card style={{ width: '90%', marginBottom: 15, marginTop: 10 }}>
          <CustomText variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Vídeo
          </CustomText>
          <View style={{ width: '100%', height: 180, borderRadius: 10, overflow: 'hidden', backgroundColor: '#dbdbdb' }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: 'https://cdn.borainvestir.b3.com.br/2023/06/30145447/atividades-fisicas-e-dinheiro-900x540.jpeg' }}
            />
          </View>
        </Card>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Card style={{ width: '40%', marginHorizontal: 0, alignItems: 'center', padding: 10 }}>
            <CustomText variant="captionBold" style={{ color: GRAY_1 }}>Repetições</CustomText>
            <CustomText variant="bodyMedium" style={{ color: GREEN_1, fontWeight: 'bold' }}>{metrics?.volume ?? '0'}</CustomText>
          </Card>
          <Card style={{ width: '40%', marginHorizontal: 0, alignItems: 'center', padding: 10 }}>
            <CustomText variant="captionBold" style={{ color: GRAY_1 }}>Séries</CustomText>
            <CustomText variant="bodyMedium" style={{ color: GREEN_1, fontWeight: 'bold' }}>{metrics?.series ?? '0'}</CustomText>
          </Card>
        </View>
      </View>

      <Card style={{ width: '90%', marginBottom: 20 }}>
        <CustomText variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
          Como executar
        </CustomText>
        {steps && (
          <>
            <FlatList
              data={steps}
              keyExtractor={item => String(item.order)}
              renderItem={({ item }) => <CustomStepText step={item.order} text={item.text} />}
              showsVerticalScrollIndicator={false}
            />
            <PositiveButton onPress={saveExercise} title="Concluir Exercí­cio" variant='label' />
          </>
        )}
      </Card>
    </SafeAreaView>
  );
}
