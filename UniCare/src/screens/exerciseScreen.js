import React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Card from "../../components/cards/Card";
import CustomText from "../../components/CustomText";
import PositiveButton from "../../components/buttons/PositiveButton";
import { GRAY_1, GREEN_1, GREEN_2 } from "../styles/Colors";

export default function ExerciseScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 15, 
        paddingVertical: 10,
        width: '100%'
      }}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Tab")}
          style={{ padding: 5 }}
        >
          <Ionicons name="arrow-back" size={28} color={GREEN_1} />
        </TouchableOpacity>
        
        <View style={{ flex: 1, marginLeft: 10 }}>
          <CustomText variant="title">
            Treino do Dia
          </CustomText>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
        
        {/* Card do Vídeo/Imagem */}
        <Card style={{ width: '90%', marginBottom: 15, marginTop: 10 }}>
          <CustomText variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Vídeo do Exercício
          </CustomText>
          <View style={{ width: '100%', height: 180, borderRadius: 10, overflow: 'hidden', backgroundColor: '#dbdbdb' }}>
            <Image 
              style={{ width: '100%', height: '100%' }} 
              source={{ uri: 'https://cdn.borainvestir.b3.com.br/2023/06/30145447/atividades-fisicas-e-dinheiro-900x540.jpeg' }} 
            />
          </View>
        </Card>

        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          width: '90%', 
          marginBottom: 15 
        }}>

          <Card style={{ width: '40%', marginHorizontal: 0, alignItems: 'center', padding: 10 }}>
            <CustomText variant="captionBold" style={{ color: GRAY_1 }}>Nível</CustomText>
            <CustomText variant="bodyMedium" style={{ color: GREEN_1, fontWeight: 'bold' }}>Leve</CustomText>
          </Card>

          <Card style={{ width: '40%', marginHorizontal: 0, alignItems: 'center', padding: 10 }}>
            <CustomText variant="captionBold" style={{ color: GRAY_1 }}>Séries</CustomText>
            <CustomText variant="bodyMedium" style={{ color: GREEN_1, fontWeight: 'bold' }}>3x15</CustomText>
          </Card>
        </View>

        <Card style={{ width: '90%', marginBottom: 20 }}>
          <CustomText variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
            Como realizar:
          </CustomText>
          <CustomText variant="bodyMedium" style={{ color: GRAY_1, marginBottom: 20 }}>
            Passo 1 - Mantenha a coluna ereta e realize os movimentos de forma suave. 
            Passo 2 -Foque na respiração e não tenha pressa para concluir as repetições.
          </CustomText>

          <PositiveButton 
            onPress={() => { navigation.navigate("Tab") }} 
            title="Concluir Exercício" 
            variant='label'/>
        </Card>
        
      </ScrollView>
    </SafeAreaView>
  );
}