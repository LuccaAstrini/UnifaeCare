import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from '../../components/cards/Card';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import PositiveButton from '../../components/buttons/PositiveButton';


// --- Dados para os níveis de feedback ---
const feedbackLevels = [
    { id: 1, emoji: '😊', title: 'Sem Dor/Esforço', description: 'Absolutamente confortável', value: 0 },
    { id: 2, emoji: '🙂', title: 'Leve', description: 'Atividade tranquila e sustentável', value: 2 },
    { id: 3, emoji: '😐', title: 'Moderado', description: 'Senti o esforço, mas sem dor', value: 5 },
    { id: 4, emoji: '😟', title: 'Intenso', description: 'Exigiu bastante concentração', value: 8 },
    { id: 5, emoji: '😫', title: 'Exaustão', description: 'Limite físico atingido', value: 10 },
];

export default function FeedbackScreen({ navigation }) {
    const [selectedLevel, setSelectedLevel] = useState(3); // Pré-selecionado como na imagem
    const [observations, setObservations] = useState('');

    const handleSaveFeedback = () => {
        const feedbackData = {
            level: feedbackLevels.find(item => item.id === selectedLevel),
            observations: observations,
        };
        console.log('Feedback Salvo:', feedbackData);
        // Aqui você pode adicionar a lógica para enviar os dados para sua API
        // e navegar para outra tela, se necessário.
        // navigation.navigate('Home');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {/* Substitua por um componente de ícone se tiver */}
                    <CustomText style={styles.closeIcon}>X</CustomText>
                </TouchableOpacity>
                <CustomText variant="bodyLarge" style={styles.headerTitle}>UNIFAE Care</CustomText>
                {/* Você pode usar um <Image> aqui se tiver o logo pequeno */}
                 <Image source={require('../../assets/unifae_logo_small.png')} style={styles.headerLogo} /> 
            </View>

            <View style={styles.content}>
                <CustomText variant="label" style={styles.sessionTitle}>SESSÃO FINALIZADA</CustomText>
                <CustomText variant="headlineLarge" style={styles.mainTitle}>Como você se sente?</CustomText>
                <CustomText variant="bodyMedium" style={styles.description}>
                    Avalie seu nível de dor e esforço após o exercício para que possamos ajustar seu plano.
                </CustomText>

                {/* Lista de Níveis */}
                <View style={styles.levelsContainer}>
                    {feedbackLevels.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => setSelectedLevel(item.id)}>
                            <Card style={[styles.card, selectedLevel === item.id && styles.selectedCard]}>
                                <View style={styles.cardContent}>
                                    <CustomText style={styles.emoji}>{item.emoji}</CustomText>
                                    <View style={styles.cardTextContainer}>
                                        <CustomText variant="bodyLarge">{item.title}</CustomText>
                                        <CustomText variant="bodySmall" style={styles.cardDescription}>{item.description}</CustomText>
                                    </View>
                                    <CustomText variant="headlineSmall" style={styles.cardValue}>{item.value}</CustomText>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Observações Adicionais */}
                <CustomText variant="label" style={styles.observationsTitle}>Observações Adicionais</CustomText>
                <CustomTextInput
                    placeholder="Descreva qualquer desconforto específico ou comentário sobre os exercícios de hoje..."
                    value={observations}
                    onChangeText={setObservations}
                    multiline
                    numberOfLines={4}
                />

                {/* Banner Unifae Care */}
                <View style={styles.logoBanner}>
                     <Image source={require('../../assets/unifae_logo_small.png')} style={styles.bannerLogo} resizeMode="contain" />
                    <CustomText variant="bodyMedium" style={styles.bannerText}>Seu progresso é nossa prioridade.</CustomText>
                </View>
            </View>

            <View style={styles.footer}>
                <PositiveButton title="Salvar Feedback" onPress={handleSaveFeedback} />
            </View>
        </ScrollView>
    );
}


// --- Estilos ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, // Ajuste para SafeArea
        paddingBottom: 10,
    },
    closeIcon: {
        fontSize: 24,
        color: '#333',
    },
    headerTitle: {
        fontWeight: 'bold',
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    sessionTitle: {
        color: '#00552B',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
    },
    mainTitle: {
        textAlign: 'center',
        marginTop: 8,
        fontWeight: 'bold',
    },
    description: {
        textAlign: 'center',
        marginTop: 16,
        color: '#555',
        lineHeight: 20,
    },
    levelsContainer: {
        marginTop: 20,
    },
    card: {
        width: '100%',
        marginHorizontal: 0,
        padding: 15,
        borderWidth: 2,
        borderColor: 'transparent', // Borda invisível por padrão
    },
    selectedCard: {
        borderColor: '#008342', // Borda verde para o item selecionado
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 30,
        marginRight: 15,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardDescription: {
        color: '#777',
    },
    cardValue: {
        color: '#555',
        fontWeight: 'bold',
    },
    observationsTitle: {
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    logoBanner: {
        backgroundColor: '#A9A9A9', // Cinza como na imagem
        borderRadius: 10,
        padding: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    bannerLogo: {
        width: 120,
        height: 40,
    },
    bannerText: {
        color: 'white',
        marginTop: 10,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 40, // Espaço na parte inferior
        paddingTop: 10,
    },
});
