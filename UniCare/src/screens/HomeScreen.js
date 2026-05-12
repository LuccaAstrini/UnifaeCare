import { View } from "react-native";
import TabNavigator from "./TabNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import CustomText from "../../components/CustomText";
import { GRAY_1, GREEN_1, GREEN_2, GREEN_3, GREEN_4 } from "../styles/Colors";
import PositiveButton from "../../components/PositiveButton";
import CircularIndicator from "../../components/CircularIndicator";

export default function HomeScreen() {
  
  const progressValue = 89;
  const progressText = progressValue < 25 ? "Você precisa exercitar" : progressValue < 75 ? "Você esta indo bem!" : "Parabens pelo resultado da semana!";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10, alignItems: 'flex-start' }}>
      <CustomText variant="title" style={{ marginBottom: 16 }}>
        Olá, seja bem-vindo!
      </CustomText>
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <Card style={{ width: '90%' }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <CustomText variant="bodyMedium" style={{ fontWeight: 'bold' }}>
              Exercicíos de hoje
            </CustomText>

            <CustomText variant="bodyMedium" style={{ color: GREEN_2 }}>
              4
            </CustomText>
          </View>

          <Card style={{ marginTop: 10, width: '100%', marginHorizontal: 0, backgroundColor: '#dbdbdb' }}>
            <CustomText variant="bodyLarge">
              Nome do exercicío
            </CustomText>

            <View style={{
              flexDirection: 'row',
            }}>
              <CustomText variant="captionBold" style={{ paddingRight: 10 }}>
                Região 1
              </CustomText>

              <CustomText variant="captionBold">
                Região 2
              </CustomText>
            </View>
            <View style={{
              flexDirection: 'row',
            }}>
              <CustomText variant="captionBold" style={{ color: GREEN_1 }}>
                12 min
              </CustomText>
            </View>

            <PositiveButton title="Iniciar exercício" onPress={() => { }} variant='label' />
          </Card>
        </Card>

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
              <CustomText variant="label" style={{ color: '#666' }}>
                Progresso
              </CustomText>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}