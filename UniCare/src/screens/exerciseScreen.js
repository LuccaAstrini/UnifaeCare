import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Card from "../components/cards/Card";
import CustomText from "../components/CustomText";
import PositiveButton from "../components/buttons/PositiveButton";
import { GRAY_1, GREEN_1, GREEN_2, GREEN_3, GREEN_4, GREEN_5, ORAGEN_1 } from "../styles/Colors";
import CustomStepText from "../components/texts/CustomStepText";
import LoadingModal from "../components/modals/LoadingModal";
import ErrorModal from "../components/modals/ErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import { useExercise } from "../hooks/useExercise";
import { ScrollView } from "react-native-gesture-handler";
import { Video, ResizeMode } from 'expo-av';
import YoutubePlayer from 'react-native-youtube-iframe';

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function ExerciseScreen({ navigation, route }) {
  const prescriptionItemId = route.params?.props;
  const vm = useExercise(prescriptionItemId, navigation);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {vm.loading
        ? <LoadingModal visible={true} message="Carregando exercício..." />
        : <ErrorModal visible={!!vm.error} message={vm.error} onClose={vm.clearError} />
      }
      <SuccessModal
        visible={vm.successVisible}
        onClose={vm.handleSuccessClose}
      />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
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
            <View style={{ width: '100%', height: 180, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000' }}>
              {getYouTubeId(vm.videoUrl) ? (
                <YoutubePlayer
                  height={180}
                  videoId={getYouTubeId(vm.videoUrl)}
                  play={false}
                />
              ) : vm.videoUrl ? (
                <Video
                  source={{ uri: vm.videoUrl }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls
                />
              ) : null}
            </View>
          </Card>

          <Card style={{ width: '100%', padding: 10 }}>
            <CustomText variant="title" style={{ color: GREEN_2, textAlign: 'center', marginBottom: 10 }}>{vm.exerciseTitle}</CustomText>

            <CustomText>{vm.exerciseDescription}</CustomText>
          </Card>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Card style={{ width: '40%', marginHorizontal: 0, alignItems: 'center', padding: 10 }}>
              <CustomText variant="captionBold" style={{ color: GRAY_1 }}>Repetições</CustomText>
              <CustomText variant="bodyMedium" style={{ color: GREEN_1, fontWeight: 'bold' }}>{vm.metrics?.volume ?? '0'}</CustomText>
            </Card>
            <Card style={{ width: '40%', marginHorizontal: 0, alignItems: 'center', padding: 10 }}>
              <CustomText variant="captionBold" style={{ color: GRAY_1 }}>Séries</CustomText>
              <CustomText variant="bodyMedium" style={{ color: GREEN_1, fontWeight: 'bold' }}>{vm.metrics?.series ?? '0'}</CustomText>
            </Card>
          </View>
        </View>

        <Card style={{ width: '90%' }} backgroundColor={GREEN_4}>
          <CustomText variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
            Objetivo
          </CustomText>
          <CustomText>
            {vm.objective}
          </CustomText>
        </Card>

        <Card style={{ width: '90%', marginBottom: 20 }}>
          <CustomText variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
            Como executar
          </CustomText>
          {vm.steps?.map(item => (
            <CustomStepText key={String(item.order)} step={item.order} text={item.text} />
          ))}
        </Card>

        <Card style={{ width: '90%' }} backgroundColor={ORAGEN_1}>
          <CustomText variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
            Nota do profissional
          </CustomText>
          <CustomText variant="bodySmall">
            {vm.notes}
          </CustomText>
        </Card>
        <View style={{ alignItems: 'center' }}>
          <PositiveButton onPress={vm.handleComplete} title="Concluir" variant='label' style={{ width: '90%' }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
