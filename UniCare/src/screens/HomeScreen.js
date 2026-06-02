import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/cards/Card";
import CustomText from "../components/CustomText";
import CircularIndicator from "../components/CircularIndicator";
import ErrorModal from '../components/modals/ErrorModal';
import LoadingModal from '../components/modals/LoadingModal';
import ConfirmModal from '../components/modals/ConfirmModal';
import ExerciseCard from "../components/cards/ExerciseCard";
import { useHome } from '../hooks/useHome';

export default function HomeScreen({ navigation }) {
  const vm = useHome(navigation);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 5, alignItems: 'flex-start' }} edges={['bottom', 'left', 'right']}>
      {vm.loading
        ? <LoadingModal visible={true} message="Buscando seus exercícios..." />
        : <ErrorModal visible={!!vm.error} message={vm.error} onClose={vm.clearError} />
      }
      <ConfirmModal
        visible={vm.logoutVisible}
        title="Sair do aplicativo"
        message="Deseja encerrar sua sessão e voltar para a tela de login?"
        confirmLabel="Sair"
        cancelLabel="Cancelar"
        onCancel={() => vm.setLogoutVisible(false)}
        onConfirm={vm.handleLogout}
      />
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>

        <Card style={{ width: '90%' }}>
          <CustomText variant="header" style={{ marginBottom: 15 }}>
            Frase do dia
          </CustomText>

          <CustomText variant="bodyMedium">
            {vm.motivationMessage}
          </CustomText>
        </Card>

        {vm.exercise !== null && <ExerciseCard exercise={vm.exercise} isPending={vm.feedbackPending} />}
        <Card style={{ width: '90%' }}>
          <CustomText variant="bodyMedium" style={{ fontWeight: 'bold' }}>
            Progresso
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ marginRight: 20 }}>
              <CircularIndicator value={vm.progressValue} />
            </View>
            <View style={{ flex: 1 }}>
              <CustomText variant="bodyMedium" style={{ marginBottom: 5 }}>
                {vm.progressMessage}
              </CustomText>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
